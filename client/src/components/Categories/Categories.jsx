import React, { useState, useEffect } from "react";
import CategoryTable from './CategoriesComponents/CategoryTable'
import FormModalAdd from './CategoriesComponents/FormModalAdd'
import FormModalEdit from './CategoriesComponents/FormModalEdit'
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, Modal, } from "reactstrap";
import './Categories.css'
import { connect } from 'react-redux'
import { actionGetCategories, actionPostCategory, actionUpdateCategory, actionDeleteCategory } from "../../redux/categoriesActions";

const Categories = (props) => {

  useEffect(() => {
    props.actionGetCategories()
  }, [])

  const [categories, setCategories] = useState(props.categories)
  const [currentCategory, setCurrentCategory] = useState()
  const [modalAdd, modalInsert] = useState(false)
  const modalAddView = () => modalInsert(!modalAdd);
  const modalAddViewFalse = () => modalInsert(false);
  const [modalEdit, modalInsertEdit] = useState(false)
  const modalEditView = () => modalInsertEdit(!modalEdit);
  const modalEditViewFalse = () => modalInsertEdit(false);

  const deleteCategory = category => {
    props.actionDeleteCategory(category)
  }
  const editCategory = category => {
    setCurrentCategory(category)
    modalEditView()
  }
  const addCategory = async (category) => {
    await props.actionPostCategory(category);
    await window.location.reload()
  }
  const updateCategory = (updatedCategory) => {
    props.actionUpdateCategory(updatedCategory)
  }
  
  return (
    <div className='componentsContainer'>
      <Container>
        <button id="buttonAdd" className='buttonStyle' onClick={e => modalAddView()}> + </button>
        <br />
        <br />
        <CategoryTable 
        categories={props.categories} 
        deleteCategory={deleteCategory} 
        editCategory={editCategory} />
      </Container>
      <Modal isOpen={modalAdd}>
        <FormModalAdd 
        addCategory={addCategory} 
        modalAddViewFalse={modalAddViewFalse} 
        categories={categories} />
      </Modal>
      <Modal isOpen={modalEdit}>
        <FormModalEdit 
        currentCategory={currentCategory} 
        modalEditViewFalse={modalEditViewFalse} 
        updateCategory={updateCategory} 
        categories={categories} />
      </Modal>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    categories: state.categoriesReducer.categories,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actionGetCategories: () => {
      dispatch(actionGetCategories())
    },
    actionPostCategory: (category) => {
      dispatch(actionPostCategory(category))
    },
    actionUpdateCategory: (category) => {
      dispatch(actionUpdateCategory(category))
    },
    actionDeleteCategory: (category) => {
      dispatch(actionDeleteCategory(category))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);