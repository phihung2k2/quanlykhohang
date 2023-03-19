export interface ProgramEntity {
    id: number;
    name: string;
    slug: string;
    description: string;
    detail: string;
    thumbnail: string;
    status: string;
    createdAt: Date;
    typeId: number;
    order: number;
    type: TypeProgramEntity;
}

export interface ProgramCreateInputDtoI {
    name: string;
    description: string;
    order: number;
    status: string;
    typeId: number;
    thumbnail?: File;
    detail?: string;
}

export interface WorkoutEntity {
    id: number;
    name: string;
    slug: string;
    description: string;
    detail: string;
    status: string;
    thumbnail: string;
    createdAt: Date;
    programId: number;
    video: string;
    program: ProgramEntity;
}

export interface WorkoutCreateInputDtoI {
    name: string;
    description: string;
    thumbnail?: File;
    order: number;
    status: string;
    programId?: number;
    detail?: string;
}

export interface TypeProgramEntity {
    id: number;
    name: string;
    slug: string;
    description: string;
    order: number;
}
export interface TypeProgramCreateInputDtoI {
    name: string;
    description: string;
    order: number;
}
