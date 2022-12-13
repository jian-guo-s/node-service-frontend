import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/home/HomeView.vue";
import RpcsIndex from "../views/nodeService/rpcs/index.vue";
import AppsIndex from "../views/nodeService/apps/index.vue";
import ProjectsList from "../views/projects/projectsList/index.vue";
import ProjectsCreat from "../views/projects/projectsCreat/index.vue";
import ProjectsTemplate from "../views/projects/projectsTemplate/index.vue";
import ProjectsTemplateDetail from "../views/projects/projectsTemplateDetail/index.vue";
import ContractDetails from "../views/projects/contractDetails/index.vue";
import ContractDeploy from "../views/projects/contractDeploy/index.vue";
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/home",
      name: "home",
      component: HomeView,
    },
    {
      path: "/",
      redirect: "/RPCs",
    },
    {
      path: "/RPCs",
      name: "RPCs",
      component: RpcsIndex,
    },
    {
      path: "/Apps",
      name: "AppsIndex",
      component: AppsIndex,
    },
    {
      path: "/projects",
      redirect: "/projects",
      children: [
        {
          path: "/projects",
          name: "ProjectsList",
          component: ProjectsList,
        },
        {
          path: "/projects/creat",
          name: "ProjectsCreat",
          component: ProjectsCreat,
        },
        {
          path: "/projects/template",
          redirect: "/ProjectsList",
          children: [
            {
              path: "/projects/template",
              name: "ProjectsTemplate",
              component: ProjectsTemplate,
            },
            {
              path: "/projects/template/deail",
              name: "ProjectsTemplateDetail",
              component: ProjectsTemplateDetail,
            }
          ]
        },
        {
          path: "/projects/contract-details",
          name: "ContractDetails",
          component: ContractDetails,
        },
        {
          path: "/projects/contract-deploy",
          name: "ContractDeploy",
          component: ContractDeploy,
        }
      ]
    },
    

  ],
});

export default router;
