import React, { useEffect } from "react";
import { useState } from "react";
import { Table } from "reactstrap";
import { connect, useDispatch } from "react-redux";
import "./Users.css";
import { actionGetUsers, actionSetAdminUser, actionSetUser, actionDeleteUser } from "../../redux/usersActions";
import MenuUser from "../MyAccount/MenuUser";

const Users = (props) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(actionGetUsers());
  }, []);

  const setAdmin = user => {
    dispatch(actionSetAdminUser(user))
    window.location.reload()
  }
  const setUser = user => {
    dispatch(actionSetUser(user))
    window.location.reload()
  }
  const deleteUser = user => {
    dispatch(actionDeleteUser(user))
  }
  const [pageLimits, setPageLimits] = useState({ min: 0, max: 4 });
  return (
    <div className='myAccountContainer' >
      <MenuUser />
      <div className='ordersAccountCont'>
      <div class="table-responsive" className='tableUsers'>
        <table class="table">
          <thead className='headProd'>
            <tr>
              <th scope="col" className='textUsers'>Nombre</th>
              <th scope="col" className='textUsers'>Email</th>
              <th scope="col" className='textUsers'>Level</th>
              <th scope="col" />
            </tr>
          </thead>
          <tbody>
            {props.users.length > 0 ? (
              props.users.map((user) =>
                user.level != "GUEST" ? (
                  <tr key={user.idUser}>
                    <th className='textUsersContent'>{user.name}</th>
                    <th className='textUsersContent'>{user.email}</th>
                    <th className='textUsersContent'>{user.level}</th>
                    <th className="buttonContUsers">
                      <button type="button" className='buttonEditCat' onClick={() => setAdmin(user)}>Admin</button>{" "}
                      <button type="button" className='buttonEditCat' onClick={() => setUser(user)} >User</button>
                      <button type="button" className='buttonEditCat' onClick={() => deleteUser(user)}>Eliminar</button>
                    </th>
                  </tr>
                ) : (
                    null
                  )
              )
            ) : (
                <tr>
                  <td>No Users</td>
                </tr>
              )}
          </tbody>
        </table>
      </div>
      {props.users ? (<div className='PagePrevNext'>
                    <button className='buttonEndOrden' onClick={() => {
                        if (pageLimits.min > 1) {
                            setPageLimits({ min: pageLimits.min - 5, max: pageLimits.max - 5 })
                        }
                    }}> {'<'} </button>
                    <button className='buttonEndOrden' onClick={() => {
                        if (pageLimits.max < props.users.length) {
                            setPageLimits({ min: pageLimits.min + 5, max: pageLimits.max + 5 })
                        }
                    }}> {'>'} </button>
                </div>) : (<div></div>)}
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    users: state.usersReducer.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actionGetUsers: () => {
      dispatch(actionGetUsers());
    },
    actionSetAdminUser: (user) => {
      dispatch(actionSetAdminUser(user))
    },
    actionSetUser: (user) => {
      dispatch(actionSetUser(user))
    },
    actionDeleteUser: (user) => {
      dispatch(actionDeleteUser(user))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
