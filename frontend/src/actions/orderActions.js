import axios from "axios"

export const allOrdersAdmin = async()=>{
  const data = await axios.get('api/v1/admin/orders');
  return data;
}
export const deleteOrder = async(id)=>{
  const data = await axios.delete(`/api/v1/admin/order/${id}`);
  return data;
}