import { message, Table } from 'antd';
import Column from 'antd/lib/table/Column';
import React, { useEffect, useState } from 'react';
import { useImperativeHandle } from 'react';
import { BiCheck, BiEdit, BiTrash } from 'react-icons/bi';
import { ImCheckmark2 } from 'react-icons/im';
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

  async function handleCompleteTodo(todoId: number, concluded: boolean) {
    showLoadingCircle();

    const result = await new TODOService().update(todoId, { concluded });

    treatCompleteTodo(result);

    hideLoadingCircle();
  }

  function treatCompleteTodo(result: IServiceResponse<Record<string, string>>) {
    if(result.error) {
      message.error(result.error);
    } else {
      message.success('Concluído com sucesso!');

      reloadData();
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
        title="Concluída"
        key="concluded"
        dataIndex="concluded"
        render={concluded => concluded ? 'Sim' : 'Não'}
      />
      <Column
        title="Ação"
        key="actions"
        render={
          todo => (
            <div className="todo-actions">
              {
                todo.concluded
                  ? <ImCheckmark2
                      className="action-icon"
                      size={32}
                      color="var(--color-danger)"
                      onClick={() => handleCompleteTodo(todo.id, !todo.concluded)}
                    />
                  : <BiCheck
                      className="action-icon"
                      size={32}
                      color="var(--color-sucess)"
                      onClick={() => handleCompleteTodo(todo.id, !todo.concluded)}
                    />
              }
              <BiEdit
                className="action-icon"
                size={32}
                color="var(--color-primary)"
                onClick={() => handleEditTODO(todo)}
              />
              <BiTrash
                className="action-icon"
                size={32}
                color="var(--color-danger)"
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
