import request from '@/utils/request';

export async function loginAdmin1(params) {
  return request('/api/login/admin1', {
    method: 'POST',
    data: params,
  });
}

export async function loginAdmin2(params) {
  return request('/api/login/admin2', {
    method: 'POST',
    data: params,
  });
}

export async function adminLogin(params) {
  return request('/api/login/superadmin', {
    method: 'POST',
    data: params,
  });
}
