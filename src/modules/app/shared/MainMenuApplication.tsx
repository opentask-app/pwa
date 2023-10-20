'use client';

import 'client-only';
import { useRouter } from 'next/navigation';
import { ProjectDto } from '@/modules/app/project/ProjectRepository';
import { MainMenuUI } from './MainMenuUI';

interface MainMenuApplicationProps {
  readonly projects: Array<ProjectDto>;
}

export const MainMenuApplication = ({ projects }: MainMenuApplicationProps) => {
  const router = useRouter();

  const onNewProjectClick = () => {
    // setIsShowingProjectModal(true);
    router.push('/app/project/new');
  };

  const onTodayItemClick = () => {
    router.push('/app/today');
  };

  const onProjectItemClick = (project: ProjectDto) => {
    router.push(`/app/project/${project.id}`);
  };

  const onProjectsItemClick = () => {
    router.push('/app/projects/active');
  };

  return (
    <>
      <MainMenuUI
        onNewProjectClick={onNewProjectClick}
        onTodayItemClick={onTodayItemClick}
        onProjectItemClick={onProjectItemClick}
        onProjectsItemClick={onProjectsItemClick}
        projects={projects}
      />
    </>
  );
};