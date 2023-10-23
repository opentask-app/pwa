import 'server-only';
import { compareAsc, format } from 'date-fns';
import { getAllProjects } from '@/modules/app/projects/ProjectsRepository';
import { TodayHeader } from '@/modules/app/today/TodayHeader';
import { AddTask } from '@/modules/app/tasks/AddTask';
import { TaskListController } from '@/modules/app/tasks/TaskListController';
import { getAllTasksDueUntilToday } from '@/modules/app/tasks/TasksRepository';
import { ErrorList } from '@/modules/shared/errors/ErrorList';

export default async function TodayPage() {
  const [{ data: projects, errors: projectsErrors }, tasks] = await Promise.all([
    getAllProjects(),
    getAllTasksDueUntilToday(),
  ]);
  const todayStr = format(new Date(), 'yyyy/MM/d');

  const tasksDueToday = tasks
    .filter((task) => task.dueDate && format(task.dueDate, 'yyyy/MM/d') === todayStr)
    .sort((taskA, taskB) => compareAsc(taskA.dueDate as Date, taskB.dueDate as Date));

  const tasksOverdue = tasks
    .filter((task) => task.dueDate && format(task.dueDate, 'yyyy/MM/d') !== todayStr)
    .sort((taskA, taskB) => compareAsc(taskA.dueDate as Date, taskB.dueDate as Date));

  if (projectsErrors) return <ErrorList errors={projectsErrors} />;

  return (
    <>
      <TodayHeader />
      {projects && projects.length > 0 && tasks.length < 1 && (
        <p className="mb-12 text-sm font-medium text-gray-600">
          No tasks due today. Enjoy your day!
        </p>
      )}
      {projects && projects.length > 0 && (
        <>
          {tasksOverdue.length > 0 && (
            <>
              <p className="text-xs font-semibold mb-4">Overdue</p>
              <TaskListController tasks={tasksOverdue} />
            </>
          )}
          {tasksOverdue.length > 0 && tasksDueToday.length > 0 && (
            <p className="text-xs font-semibold mb-4">Today</p>
          )}
          <TaskListController
            addTask={
              <AddTask defaultDueDate={new Date()} project={projects[0]} projects={projects} />
            }
            tasks={tasksDueToday}
          />
        </>
      )}
    </>
  );
}
