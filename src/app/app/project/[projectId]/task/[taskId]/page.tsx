import 'server-only';
import ProjectHeader from '@/app/app/shared/project/ProjectHeader';
import AppShell from '@/app/app/shared/ui/AppShell';
import { findManyProjects, findProjectById } from '@/app/app/shared/project/project-model';
import AddTask from '@/app/app/shared/task/AddTask';
import { TaskListController } from '@/app/app/shared/task/TaskListController';
import TaskModal from '@/app/app/shared/task/TaskModal';
import { findTaskById } from '@/app/app/shared/task/task-model';

interface ProjectTaskPageProps {
  readonly params: { readonly projectId: string; taskId: string };
}

export default async function ProjectTaskPage({
  params: { projectId, taskId },
}: ProjectTaskPageProps) {
  const [projects, project, task] = await Promise.all([
    findManyProjects(),
    findProjectById({ id: projectId }),
    findTaskById(taskId),
  ]);

  if (!project || !projects || projects.length === 0) return;

  return (
    <AppShell projects={projects}>
      <ProjectHeader project={project} />
      <TaskListController project={project} tasks={project.tasks || []} />
      <AddTask project={project} projects={projects} />
      <TaskModal project={project} projects={projects} task={task} />
    </AppShell>
  );
}
