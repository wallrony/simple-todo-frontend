import { Form, Input, message, Modal } from 'antd';
import { MaskedInput } from 'antd-masked-input';
import { useForm } from 'antd/lib/form/Form';
import TextArea from 'antd/lib/input/TextArea';
import React, { useEffect } from 'react';
import CreateTODODTO from '../../../domain/dto/CreateTODODTO';
import IServiceResponse from '../../../domain/models/IServiceResponse';
import ITODO from '../../../domain/models/ITODO';
import TODOService from '../../../services/TODOService';
import { hideLoadingCircle, showLoadingCircle } from '../../../utils/ComponentUtils';
import { formatDate } from '../../../utils/DateUtils';
import { requiredRule } from '../../../utils/FieldRuleUtils';

interface ModalCreateTODOProps {
  show: boolean;
  hide: () => void;
  
  edit?: boolean;
  todo?: ITODO;

  onFinalize: () => void;
}

const ModalCreateTODO: React.FC<ModalCreateTODOProps> = ({
  show, hide, edit, todo, onFinalize
}) => {
  const [form] = useForm();

  useEffect(() => {
    form.setFieldsValue({
      'title': todo?.title ?? '',
      'description': todo?.description ?? '',
      'date': formatDate(todo?.date) ?? ''
    });
  }, [todo])

  async function handleFinish() {
    const validation = await form.validateFields();

    if(validation.errorFields) {
      message.error('Complete os campos pendentes!');

      return;
    }

    const values = form.getFieldsValue();

    if(edit) {
      editTodo(values);
    } else {
      createTodo(values);
    }
  }

  async function createTodo(values: Record<string, any>) {
    showLoadingCircle();

    const result = await new TODOService().create(values as CreateTODODTO);

    treatFinalize(result);

    hideLoadingCircle();
  }

  async function editTodo(values: Record<string, any>) {
    showLoadingCircle();

    let result;

    if(todo) {
      result = await new TODOService().update(todo?.id, values as CreateTODODTO);
    }

    if(result) {
      treatFinalize(result);
    }

    hideLoadingCircle();
  }

  function treatFinalize(result: IServiceResponse<ITODO | Record<string, string>>) {
    if(result.error) {
      message.error(result.error);
    } else {
      let msg;

      if(edit) {
        msg = 'Atividade atualizada com sucesso!';
      } else {
        msg = 'Atividade criada com sucesso!';
      }

      message.success(msg);

      onFinalize();
      hide();
    }
  }

  return (
    <Modal
      title={
        edit ? 'Editar Atividade' : 'Adicionar Atividade'
      }
      onCancel={hide}
      onOk={handleFinish}
      cancelText="Cancelar"
      okText="Finalizar"

      visible={show}
    >
      <Form form={form}>
        <Form.Item label="Título" name="title" rules={[requiredRule()]}>
          <Input
            maxLength={60}
            required
          />
        </Form.Item>
        <Form.Item label="Descrição" name="description">
          <TextArea
            name="description"
          />
        </Form.Item>
        <Form.Item label="Data" name="date" rules={[requiredRule()]}>
          <MaskedInput
            name="date"
            mask="11/11/1111"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ModalCreateTODO;
