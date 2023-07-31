import AppShell from './AppShell';
import { findManyProjects, findProjectById } from '../project/project-model';
import TaskListAndTaskForm from '../task/TaskListAndTaskForm';
import TaskModal from '../task/TaskModal';
import { TaskData } from '../task/TaskData';
import { ProjectData } from '../project/ProjectData';

interface AppShellServerProps {
  readonly projectId?: string;
  readonly taskId?: string;
}

const tasks: Array<TaskData> = [];

for (let x = 0; x < 30; x++) {
  tasks.push({
    id: String(x + 1),
    name: `My task #${
      x + 1
    }: this one is pretty easy, just tick it! Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.`,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    projectId: '1',
  });
}

const _task: TaskData = {
  id: '1',
  name: 'My simple task lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet.',
  description: 'This task is pretty simple indeed.',
  projectId: '1',
};

export default async function AppShellServer({ projectId, taskId }: AppShellServerProps) {
  console.log(`AppShellServer() - projectId: ${projectId} | taskId: ${taskId}`);
  let project: ProjectData | null = null;
  let task: TaskData | null = null;
  let projects: Array<ProjectData> = [];
  const projectsPromise = findManyProjects().then((res) => {
    console.log('AppShellServer().findManyProjects().then() - res: ', res);
    projects = res;
    return projects;
  });
  const promises: Array<Promise<any>> = [projectsPromise];

  if (typeof projectId === 'string' && projectId !== '') {
    console.log('AppShellServer() - HAS projectId - call findProjectById()');
    const projectPromise = findProjectById(projectId).then((res) => {
      console.log('AppShellServer().findProjectById().then() - res: ', res);
      project = res;
      return project;
    });
    promises.push(projectPromise);
  }

  if (typeof taskId === 'string' && taskId !== '') {
    task = _task;
  }

  await Promise.all(promises);

  return (
    <AppShell project={project} projects={projects}>
      {project && tasks && (
        <TaskListAndTaskForm project={project} projects={projects} tasks={tasks} />
      )}
      {project && task && <TaskModal project={project} projects={projects} task={task} />}
    </AppShell>
  );
}