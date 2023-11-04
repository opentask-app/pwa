import 'server-only';
import { ErrorList } from '@/modules/shared/errors/ErrorList';
import { getAllProjects, getProjectById } from '@/modules/app/projects/ProjectsRepository';
import { Dialog } from '@/modules/shared/dialog/Dialog';
import { TaskForm } from '@/modules/app/tasks/TaskForm';
import { RouterActionType } from '@/modules/shared/controls/button/RouterActions';

interface NewTaskDialogInterceptingPageProps {
  readonly searchParams: { readonly projectId: string };
}

export default async function NewTaskDialogInterceptingPage({
  searchParams: { projectId },
}: NewTaskDialogInterceptingPageProps) {
  const [{ data: projects, errors: projectsErrors }, { data: project, errors: projectErrors }] =
    await Promise.all([getAllProjects(), getProjectById({ id: projectId })]);

  if (projectsErrors) return <ErrorList errors={projectsErrors} />;
  if (projectErrors) return <ErrorList errors={projectErrors} />;

  if (!project) return;
  if (!projects || projects.length < 1) return null;

  return (
    <Dialog
      defaultOpen
      routerActionsOnClose={[{ type: RouterActionType.Back }, { type: RouterActionType.Refresh }]}
    >
      <TaskForm
        project={project}
        projects={projects}
        shouldStartOnEditingMode
        taskNameClassName="text-2xl"
      />
    </Dialog>
  );
}