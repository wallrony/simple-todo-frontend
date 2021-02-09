import CreateTODODTO from "../../domain/dto/CreateTODODTO";
import UpdateTODODTO from "../../domain/dto/UpdateTODODTO";
import ITODO from "../../domain/models/ITODO";
import api from "./api";

class TODOApi {
  async fetchAll(): Promise<ITODO[]> {
    const result = await api.get<ITODO[]>('/core/todo');

    return result.data;
  }

  async create(dto: CreateTODODTO): Promise<ITODO> {
    const result = await api.post('/core/todo', dto);

    return result.data;
  }

  async update(todoId: number, dto: UpdateTODODTO): Promise<Record<string, string>> {
    const result = await api.put(`/core/todo/${todoId}`, dto);

    return result.data;
  }

  async delete(todoId: number): Promise<Record<string, string>> {
    const result = await api.delete(`/core/todo/${todoId}`);

    return result.data;
  }
}

export default TODOApi;
