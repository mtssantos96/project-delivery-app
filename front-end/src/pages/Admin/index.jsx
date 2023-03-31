// import { useContext } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import NavBar from '../../components/NavBar';
import { createUser, deleteUser, listUser, setToken } from '../../service/api';
// import AuthContext from '../../context/AuthContext';

import style from './style.module.css';

export default function Admin() {
  // const { userData } = useContext(AuthContext);
  const [userTable, setUserTable] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('seller');
  const [errorMessage, setErrorMessage] = useState('');

  const valid = useMemo(() => (
    name.length >= (2 * 2 + 2) * 2
    && /^\S+@\S+\.\S+$/.test(email)
    && password.length >= (2 * 2) + 2
    && role
  ), [name, email, password, role]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createUser({ name, email, password, role });
      setErrorMessage('');
      const users = await listUser();
      setUserTable(users);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    const users = await listUser();
    setUserTable(users);
  };

  useEffect(() => {
    const fetchUserList = async () => {
      const users = await listUser();
      setUserTable(users);
    };
    const data = localStorage.getItem('user');
    if (data) {
      setToken(JSON.parse(data).token);
    }
    fetchUserList();
  }, []);

  return (
    <>
      <NavBar />
      <div className={ style.adminContainer }>
        <form onSubmit={ handleSubmit }>
          <label
            htmlFor="name"
          >
            Name
            <input
              data-testid="admin_manage__input-name"
              id="name"
              type="text"
              placeholder="Given name"
              value={ name }
              onChange={ (e) => setName(e.target.value) }
            />
          </label>
          <label
            htmlFor="email"
          >
            Email
            <input
              data-testid="admin_manage__input-email"
              id="email"
              type="text"
              placeholder="email@email.com"
              value={ email }
              onChange={ (e) => setEmail(e.target.value) }
            />
          </label>
          <label
            htmlFor="password"
          >
            Senha
            <input
              data-testid="admin_manage__input-password"
              id="password"
              type="password"
              placeholder="************"
              value={ password }
              onChange={ (e) => setPassword(e.target.value) }
            />
          </label>
          {/* <label
            htmlFor="role"
          > */}
          Tipo
          <select
            data-testid="admin_manage__select-role"
            id="role"
            value={ role }
            onChange={ (e) => setRole(e.target.value) }
          >
            <option value="seller">Vendedor</option>
            <option value="customer">Consumidor</option>
          </select>
          {/* </label> */}
          <button
            data-testid="admin_manage__button-register"
            type="submit"
            disabled={ !valid }
          >
            Cadastrar
          </button>
          { errorMessage && (
            <p data-testid="admin_manage__element-invalid-register">{errorMessage}</p>
          ) }
        </form>
        <table>
          <thead>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Remover</th>
          </thead>
          <tbody>
            { userTable.map((user, index) => (
              <tr key={ user.id }>
                <td
                  data-testid={ `admin_manage__element-user-table-item-number-${index}` }
                >
                  {user.id}

                </td>
                <td data-testid={ `admin_manage__element-user-table-name-${index}` }>
                  {user.name}

                </td>
                <td data-testid={ `admin_manage__element-user-table-email-${index}` }>
                  {user.email}
                </td>
                <td
                  data-testid={ `admin_manage__element-user-table-role-${index}` }
                >
                  {user.role}

                </td>
                <td>
                  <button
                    type="button"
                    data-testid={ `admin_manage__element-user-table-remove-${index}` }
                    onClick={ () => handleDelete(user.id) }
                    aria-labelledby="Excluir"
                  >
                    <span aria-hidden>
                      <FaTrash />
                    </span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
