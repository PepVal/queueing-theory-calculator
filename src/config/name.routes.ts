interface RouteInterface {
  home: string;
  theory: string;
  about: string;
  m_m_1: string;
  m_m_k: string;
  m_m_1_m_m: string;
  m_m_k_m_m: string;
}

const Routes: RouteInterface = {
  home: '/',
  theory: '/theory',
  about: '/about',
  m_m_1: '/calculator/m_m_1',
  m_m_k: '/calculator/m_m_k',
  m_m_1_m_m: '/calculator/m_m_1_m_m',
  m_m_k_m_m: '/calculator/m_m_1_m_m',
};

export default Routes;
