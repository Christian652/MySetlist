export const MethodToAction = (method: string) => {
  const methodActions = {
    'POST': 'Create',
    'PUT': 'Update',
    'DELETE': 'Delete',
    'PATCH': 'Update',
  }

  return methodActions[method] || "Unabled";
}