import Facade from "../data/facade";
import CreateTODODTO from "../domain/dto/CreateTODODTO";
import UpdateTODODTO from "../domain/dto/UpdateTODODTO";
import IServiceResponse from "../domain/models/IServiceResponse";
import ITODO from "../domain/models/ITODO";

class TODOService {
  async fetchAll(): Promise<IServiceResponse<ITODO[]>> {
    const result: IServiceResponse<ITODO[]> = {};

    try {
      result.data = await new Facade().fetchAllTODO();
    } catch(e) {
      if(e.response) {
        result.error = e.response.data.message;
      } else {
        result.error = e.message;
      }
    }

    return result;
  }

  async create(dto: CreateTODODTO): Promise<IServiceResponse<ITODO>> {
    const result: IServiceResponse<ITODO> = {};

    try {
      result.data = await new Facade().createTODO(dto);
    } catch(e) {
      if(e.response) {
        result.error = e.response.data.message;
      } else {
        result.error = e.message;
      }
    }

    return result;
  }

  async update(todoId: number, dto: UpdateTODODTO): Promise<IServiceResponse<Record<string, string>>> {
    const result: IServiceResponse<Record<string, string>> = {};

    try {
      result.data = await new Facade().updateTODO(todoId, dto);
    } catch(e) {
      if(e.response) {
        result.error = e.response.data.message;
      } else {
        result.error = e.message;
      }
    }

    return result;
  }

  async delete(todoId: number): Promise<IServiceResponse<Record<string, string>>> {
    const result: IServiceResponse<Record<string, string>> = {};

    try {
      result.data = await new Facade().deleteTODO(todoId);
    } catch(e) {
      if(e.response) {
        result.error = e.response.data.message;
      } else {
        result.error = e.message;
      }
    }

    return result;
  }
}

export default TODOService;
