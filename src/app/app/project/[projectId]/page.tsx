import 'server-only';
import AppShell from '@/app/app/modules/common/AppShell';
import ProjectHeader from '@/app/app/modules/project/ProjectHeader';
import { findManyProjects, findProjectById } from '@/app/app/modules/project/project-model';
import AddTask from '@/app/app/modules/task/AddTask';
import { TaskListController } from '@/app/app/modules/task/TaskListController';

interface ProjectPageProps {
  readonly params: { readonly projectId: string };
}

export default async function ProjectPage({ params: { projectId } }: ProjectPageProps) {
  const [projects, project] = await Promise.all([
    findManyProjects(),
    findProjectById({ id: projectId }),
  ]);

  if (!project) return;

  return (
    <AppShell projects={projects}>
      <ProjectHeader project={project} />
      {project.tasks.length < 1 && (
        <p className="mb-12 text-sm font-medium text-gray-600">No tasks in this project.</p>
      )}
      <TaskListController
        addTask={<AddTask project={project} projects={projects} />}
        project={project}
        tasks={project.tasks}
      />
    </AppShell>
  );
}
