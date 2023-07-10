'use client';

import 'client-only';
import { MoreHorizontalSvg } from '@/shared/ui/MoreHorizontalSvg';
import { ProjectData } from './ProjectData';

interface ProjectProps {
  readonly project: ProjectData;
}

export default function Project({ project }: ProjectProps) {
  return (
    <div className="flex flex-col pb-8">
      <div className="sticky top-0 flex w-full justify-between bg-white py-8">
        <h1 className="text-lg font-semibold text-gray-800">{project.name}</h1>
        <MoreHorizontalSvg />
      </div>
      <p className="mb-8 block text-sm">{project.description}</p>
    </div>
  );
}
