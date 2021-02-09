import CreateTODODTO from "../domain/dto/CreateTODODTO";
import UpdateTODODTO from "../domain/dto/UpdateTODODTO";
import ITODO from "../domain/models/ITODO";
import TODOApi from "./api/TODOApi";

class Facade {
  async fetchAllTODO(): Promise<ITODO[]> {
    return await new TODOApi().fetchAll();
  }

  async createTODO(dto: CreateTODODTO): Promise<ITODO> {
    return await new TODOApi().create(dto);
  }

  async updateTODO(todoId: number, dto: UpdateTODODTO): Promise<Record<string, string>> {
    return await new TODOApi().update(todoId, dto);
  }

  async deleteTODO(todoId: number): Promise<Record<string, string>> {
    return await new TODOApi().delete(todoId);
  }
}

export default Facade;
