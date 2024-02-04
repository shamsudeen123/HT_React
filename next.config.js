/** @type {import('next').NextConfig} */
const nextConfig = ({
  env: {
    HOST_API_KEY: "http://146.190.56.52:3000",
  },
});

module.exports = nextConfig;
// / eslint-disable @typescript-eslint/no-var-requires /
// const withTM = require("next-transpile-modules")([
//   "@fullcalendar/common",
//   "@fullcalendar/daygrid",
//   "@fullcalendar/interaction",
//   "@fullcalendar/list",
//   "@fullcalendar/react",
//   "@fullcalendar/timegrid",
//   "@fullcalendar/timeline",
// ]);

// module.exports = withTM({
//   env: {
//     // // HOST
//     HOST_API_KEY: "http://localhost:3142/", // dev
//     // HOST_API_KEY: 'https://ecomodoo.goldstarproducts.com/api/', // staging
//   },
//   distDir: "build",
// });
