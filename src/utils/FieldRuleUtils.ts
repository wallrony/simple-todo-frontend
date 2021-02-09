import { Rule } from "antd/lib/form";

export function requiredRule(): Rule {
  return {required: true, message: 'Você precisa preencher este campo!'}
}