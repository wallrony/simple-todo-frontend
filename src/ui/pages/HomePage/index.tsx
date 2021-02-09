import React, { useState } from 'react';
import { BiCalendar, BiPlus } from 'react-icons/bi';
import ITODO from '../../../domain/models/ITODO';
import ModalCreateTODO from '../../components/ModalCreateTODO';
import TODOTable, { TODOTableHandlers } from '../../components/TODOTable';

import './styles.css';

const HomePage: React.FC = () => {
  const tableRef = React.createRef<TODOTableHandlers>();

  const [showCreateTODOModal, setShowCreateTODOModal] = useState<boolean>(false);
  const [todoToEdit, setTODOToEdit] = useState<ITODO>();

  async function handleEditTODO(todo: ITODO) {
    setShowCreateTODOModal(true);

    setTODOToEdit(todo);
  }

  function handleHideModal() {
    setShowCreateTODOModal(false);
    if(todoToEdit) {
      setTODOToEdit(undefined);
    }
  }

  function onFinalizeAddOrEdit() {
    tableRef.current?.reloadData();
  }

  return (
    <div id="home-page">
      <header>
        <div className="page-title">
          <BiCalendar size={48} color="var(--color-primary)" />
          <h1>Lista de Atividades</h1>
        </div>
        <BiPlus
          className="action-icon"
          size={48}
          color="var(--color-primary)"
          onClick={() => setShowCreateTODOModal(true)}
        />
      </header>
      <div id="page-content">
        <TODOTable
          ref={tableRef}
          handleEditTODO={handleEditTODO}
        />
        <ModalCreateTODO
          show={showCreateTODOModal}
          hide={handleHideModal}
          todo={todoToEdit}
          edit={todoToEdit !== undefined}
          onFinalize={onFinalizeAddOrEdit}
        />
      </div>
    </div>
  );
}

export default HomePage;
