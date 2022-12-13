import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/home/HomeView.vue";
import RpcsIndex from "../views/nodeService/rpcs/index.vue";
import AppsIndex from "../views/nodeService/apps/index.vue";
import ProjectsList from "../views/projects/projectsList/index.vue";
import ProjectsListDetails from "../views/projects/projectsListDetails/index.vue";
import ProjectsCreat from "../views/projects/projectsCreat/index.vue";
import ProjectsTemplate from "../views/projects/projectsTemplate/index.vue";
import ProjectsTemplatesDetails from "../views/projects/projectsTemplatesDetails/index.vue";
import ProjectsWorkflows from "../views/projects/projectsWorkflows/index.vue";
import ProjectsWorkflowsAllLogs from "../views/projects/projectsWorkflowsAllLogs/index.vue";
import projectsArtifactsContractDeploy from "../views/projects/projectsArtifactsContractDeploy/index.vue";
import ProjectsContractsDetails from "../views/projects/projectsContractsDetails/index.vue";
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/home",
      name: "home",
      component: HomeView,
    },
    // {
    //   path: "/",
    //   redirect: "/RPCs",
    // },
    // {
    //   path: "/RPCs",
    //   name: "RPCs",
    //   component: RpcsIndex,
    // },
    // {
    //   path: "/Apps",
    //   name: "AppsIndex",
    //   component: AppsIndex,
    // },
    {
      path: "/",
      redirect: "/projects",
      children: [
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
              path: "/projects/:id/details",
              name: "ProjectsListDetails",
              component: ProjectsListDetails,
            }
          ],
        },
        {
          path: "/projects/creat",
          name: "ProjectsCreat",
          component: ProjectsCreat,
        }, 
        {
          path: "/projects/template",
          redirect: "/projects/template",
          children: [
            {
              path: "/projects/template",
              name: "ProjectsTemplate",
              component: ProjectsTemplate,
            },
            {
              path: "/projects/templates/:templateId/details",
              name: "ProjectsTemplatesDetails",
              component: ProjectsTemplatesDetails,
            }
          ]
        },
        {
          path: "/projects/:id/workflows/:workflowId",
          redirect: "/projects/:id/workflows/:workflowId",
          children: [
            {
              path: "/projects/:id/workflows/:workflowId",
              name: "ProjectsWorkflows",
              component: ProjectsWorkflows,
            },
            {
              path: "/projects/:id/workflows/:workflowId/allLogs",
              name: "ProjectsWorkflowsAllLogs",
              component: ProjectsWorkflowsAllLogs,
            }
            
          ],
        },
        {
          path: "/projects/:id/artifacts-contract/:version/deploy",
          name: "projectsArtifactsContractDeploy",
          component: projectsArtifactsContractDeploy,
        },
        {
          path: "/projects/:id/contracts-details/:version",
          name: "ProjectsContractsDetails",
          component: ProjectsContractsDetails,
        }
      ]
    },
    {
      path: "/nodeService",
      redirect: "/nodeService/RPCs",
      children: [
        {
          path: "/nodeService/RPCs",
          name: "RPCs",
          component: RpcsIndex,
        },
        {
          path: "/nodeService/Apps",
          name: "AppsIndex",
          component: AppsIndex,
        }
      ],
    },
  ],
});

export default router;
