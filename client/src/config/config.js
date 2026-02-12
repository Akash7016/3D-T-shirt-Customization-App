const config = {
  development: {
    backendUrl: "http://localhost:8080/api/v1/dalle",
  },
  production: {
    backendUrl: "/api/v1/dalle", // Relative path for Vercel
  },
};

export default config;
