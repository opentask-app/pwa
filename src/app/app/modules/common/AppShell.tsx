'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

import { ChildrenProps } from '@/app/modules/common/ChildrenProps';
import AppHeader from '@/app/app/modules/common/AppHeader';
import AppNav from '@/app/app/modules/common/AppNav';
import { ProjectDTO } from '@/app/app/modules/project/project-model-dto';
import ProjectModal from '@/app/app/modules/project/ProjectModal';
import { CreateProjectDTO, UpdateProjectDTO } from '@/app/app/modules/project/project-model-dto';
import { createProject } from '@/app/app/modules/project/project-model-db';
import SettingsModal from '@/app/app/modules/settings/SettingsModal';
import { ConfirmationModal, ConfirmationModalProps } from './ConfirmationModal';
import { deleteUserAccount } from '../user/user-model';
import PwaPromptModal from '@/app/modules/common/pwa/PwaPromptModal';

interface AppShellProps extends ChildrenProps {
  readonly projects: Array<ProjectDTO>;
}

export default function AppShell({ children, projects }: AppShellProps) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean | null>(null);
  const [isShowingProjectModal, setIsShowingProjectModal] = useState(false);
  const [isShowingSettingsModal, setIsShowingSettingsModal] = useState(false);
  const [confirmationModalProps, setConfirmationModalProps] =
    useState<ConfirmationModalProps | null>(null);

  const headerRef = useRef<HTMLElement>(null);
  const router = useRouter();

  const onCloseProjectModal = () => {
    setIsShowingProjectModal(false);
  };

  const onCreateProject = async (data: CreateProjectDTO) => {
    const project = await createProject(data);
    onCloseProjectModal();
    router.push(`/app/project/${project.id}`);
    /*
     * This is necessary to refetch data and rerender the UI.
     * Otherwise, data changes do not display in the UI.
     */
    router.refresh();
    /**/
  };

  const onUpdateProject = async (data: UpdateProjectDTO) => {
    throw new Error('This operation should be handler by a different component.');
  };

  const noProjectsMessage = () => (
    <p className="mt-4 text-sm font-medium text-gray-600">
      You don&#39;t have any projects yet.{' '}
      <button
        type="button"
        className="text-blue-600 hover:text-blue-500"
        onClick={() => setIsShowingProjectModal(true)}
      >
        Click here
      </button>{' '}
      to create your first.
    </p>
  );

  const onCloseSettingsModal = () => {
    if (confirmationModalProps) return;
    setIsShowingSettingsModal(false);
  };

  const navToSettingsPage = () => {
    setIsShowingSettingsModal(true);
  };

  const onCloseConfirmationModal = () => {
    setConfirmationModalProps(null);
  };

  const onDeleteAccount = () => {
    setConfirmationModalProps({
      confirmButtonLabel: 'Delete',
      modalCopy: (
        <span>Are you sure you want to delete you account and all data associated to it?</span>
      ),
      modalTitle: 'Delete Task',
      onCancelHandler: onCloseConfirmationModal,
      onConfirmHandler: async () => {
        deleteUserAccount();
      },
      open: true,
    });
  };

  useLayoutEffect(() => {
    if (headerRef.current === undefined || headerRef.current === null) return;
    const headerWidth = headerRef.current.getBoundingClientRect().width;
    setIsMenuOpen(headerWidth >= 768);
  }, []);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <AppHeader
        onMenuButtonClick={() => setIsMenuOpen(!isMenuOpen)}
        onSettingsButtonClick={navToSettingsPage}
        ref={headerRef}
      />
      <div className="flex h-full overflow-hidden">
        <AppNav
          isOpen={isMenuOpen}
          projects={projects}
          onNewProjectClick={() => setIsShowingProjectModal(true)}
        />
        <div className="w-full overflow-y-auto overflow-x-hidden md:flex">
          <div className="flex w-full max-w-[24rem] flex-col px-4 md:max-w-[38rem] md:pl-8 lg:max-w-[60rem] xl:pl-36  2xl:pl-60">
            <div className="pb-16">
              {children}
              {(!projects || projects.length === 0) && noProjectsMessage()}
            </div>
          </div>
        </div>
      </div>
      <ProjectModal
        open={isShowingProjectModal}
        onCloseHandler={onCloseProjectModal}
        onCreateProject={onCreateProject}
        onUpdateProject={onUpdateProject}
      />
      <SettingsModal
        open={isShowingSettingsModal}
        onCloseModal={onCloseSettingsModal}
        onDeleteAccount={onDeleteAccount}
      />
      <PwaPromptModal />
      {confirmationModalProps && <ConfirmationModal {...confirmationModalProps} />}
    </div>
  );
}
