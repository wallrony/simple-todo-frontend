import { message, Table } from 'antd';
import Column from 'antd/lib/table/Column';
import React, { useEffect, useState } from 'react';
import { useImperativeHandle } from 'react';
import { BiEdit, BiTrash } from 'react-icons/bi';
import IServiceResponse from '../../../domain/models/IServiceResponse';
import ITODO from '../../../domain/models/ITODO';
import TODOService from '../../../services/TODOService';
import { hideLoadingCircle, showLoadingCircle } from '../../../utils/ComponentUtils';
import { formatDate } from '../../../utils/DateUtils';

export interface TODOTableHandlers {
  reloadData: () => void;
}

interface TODOTableProps {
  handleEditTODO: (todo: ITODO) => void;
}

const TODOTable = React.forwardRef<TODOTableHandlers, TODOTableProps>(({ handleEditTODO }, ref) => {
  const [todos, setTODOS] = useState<ITODO[]>();

  useImperativeHandle(ref, () => {
    return {
      reloadData: reloadData
    }
  });

  function reloadData() {
    setTODOS(undefined);

    fetchTodos();
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    const result = await new TODOService().fetchAll();

    treatFetchTODOS(result);
  }

  function treatFetchTODOS(result: IServiceResponse<ITODO[]>) {
    if(result.error) {
      message.error(result.error);
    } else if(result.data) {
      setTODOS(result.data);
    }
  }

  async function handleDeleteTodo(todoId: number) {
    showLoadingCircle();

    const result = await new TODOService().delete(todoId);

    treatHandleDelete(result);

    hideLoadingCircle();
  }

  function treatHandleDelete(result: IServiceResponse<Record<string, string>>) {
    if(result.error) {
      message.error(result.error);
    } else {
      reloadData();

      message.success('Atividade deletada com sucesso!');
    }
  }

  return (
    <Table<ITODO>
      dataSource={todos}
      loading={todos === undefined}
      pagination={false}
    >
      <Column
        title="Título"
        key="title"
        dataIndex="title"
      />
      <Column
        title="Descrição"
        key="description"
        dataIndex="description"
        render={description => description ?? 'Sem descrição'}
      />
      <Column
        title="Data"
        key="date"
        dataIndex="date"
        render={date => formatDate(date)}
      />
      <Column
        title="Ação"
        key="actions"
        render={
          todo => (
            <div className="todo-actions">
              <BiEdit
                className="action-icon"
                size={32}
                color="var(--color-primary)"
                onClick={() => handleEditTODO(todo)}
              />
              <BiTrash
                className="action-icon"
                size={32}
                color="var(--color-primary)"
                onClick={() => handleDeleteTodo(todo.id)}
              />
            </div>
          )
        }
      />
    </Table>
  );
});

TODOTable.displayName = 'TODOTable';

export default TODOTable;
