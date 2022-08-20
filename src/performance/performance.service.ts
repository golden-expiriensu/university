import { Injectable } from '@nestjs/common';
import { DBAccessService } from 'src/db-access/db-access.service';

import { CreateGradeDto, DeleteGradeDto, EditGradeDto } from './dto';
import { SelectGradesDBResponse } from './types';

@Injectable()
export class PerformanceService {
  constructor(private db: DBAccessService) {}

  public async createGrade(dto: CreateGradeDto): Promise<number> {
    return (
      await this.db.performance.create({
        data: { ...dto },
      })
    ).id;
  }

  public async editGrade(dto: EditGradeDto): Promise<void> {
    await this.db.performance.update({
      where: {
        id: dto.id,
      },
      data: (() => {
        delete dto.id;
        return dto;
      })(),
    });
  }

  public async deleteGrade(dto: DeleteGradeDto): Promise<void> {
    await this.db.performance.delete({
      where: {
        id: dto.id,
      },
    });
  }

  public async getProfileGradesByLesson(
    profileId: number,
    lesson: number,
  ): Promise<number[]> {
    return this.db.performance
      .findMany({
        where: {
          lesson,
          student: {
            userId: profileId,
          },
        },
      })
      .then((a) => a.map((e) => e.grade));
  }

  public async getProfileAverageGradeByLesson(
    profileId: number,
    lesson: number,
  ): Promise<number> {
    const grades = await this.getProfileGradesByLesson(profileId, lesson);
    return grades.reduce((t, c) => t + c, 0) / grades.length;
  }

  public async getAverageGradeByStudent(
    studentProfileId: number,
  ): Promise<number> {
    return this.findAverageGrade(
      await this.getProfileGottenGrades({
        where: { userId: studentProfileId },
      }),
    );
  }

  public async getAverageGradeByGroup(group: number): Promise<number> {
    return this.findAverageGrade(
      await this.getProfileGottenGrades({ where: { group } }),
    );
  }

  public async getAverageGradeByFaculty(faculty: string): Promise<number> {
    return this.findAverageGrade(
      await this.getProfileGottenGrades({ where: { faculty } }),
    );
  }

  public async getAverageGradeByUniversity(
    university: string,
  ): Promise<number> {
    return this.findAverageGrade(
      await this.getProfileGottenGrades({ where: { university } }),
    );
  }

  private async findAverageGrade(
    dbResponse: SelectGradesDBResponse,
  ): Promise<number> {
    const flatten = dbResponse.map((e) => e.gottenGrades).flat();
    return flatten.reduce((t, c) => t + c.grade, 0) / flatten.length;
  }

  private getProfileGottenGrades(
    filter: object,
  ): Promise<SelectGradesDBResponse> {
    return this.db.profile.findMany({
      where: {
        NOT: {
          group: null,
        },
      },
      select: {
        userId: true,
        gottenGrades: {
          select: {
            grade: true,
          },
        },
      },
      ...filter,
    });
  }
}
