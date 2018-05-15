import request from '../utils/request';

export function query() {
	return request('/api/user/userQuery');
}

export function deleteUser(userId) {
	return request(`/api/user/userDelete?userId=${userId}`);
}

export async function updateUser(values){
  return request(`/api/user/userUpdate `, {
    method: 'POST',
    headers: {
   'Accept': 'application/json',
   'Content-Type': 'application/json;charset=utf-8'
 },
    body: JSON.stringify(values)
  });
}

export async function addUser(values) {
  return request(`/api/user/userCreate`, {
    method: 'POST',
    headers: {
   'Accept': 'application/json',
   'Content-Type': 'application/json;charset=utf-8'
 },
    body: JSON.stringify(values)
  });
}
