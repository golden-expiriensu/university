import { Injectable } from '@nestjs/common';
import { DBAccessService } from 'src/db-access/db-access.service';

import { CreateGradeDto, EditGradeDto } from './dto';
import { DeleteGradeDto } from './dto/deleteGrade';
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

  public async getProfileGradesByLesson(dto: {
    profileId: number;
    lesson: number;
  }): Promise<number[]> {
    const response = await this.getGrades({
      where: { gottenGrades: { lesson: dto.lesson }, id: dto.profileId },
    });

    return response
      .map((e) => [...e.gottenGrades])
      .flat()
      .map((e) => e.grade);
  }

  public async getProfileAverageGradeByLesson(dto: {
    profileId: number;
    lesson: number;
  }): Promise<number> {
    const grades = await this.getProfileGradesByLesson(dto);
    return grades.reduce((t, c) => t + c, 0) / grades.length;
  }

  public async getAverageGradeByStudent(
    studentProfileId: number,
  ): Promise<number> {
    return this.findAverageGrade(
      await this.getGrades({ where: { userId: studentProfileId } }),
    );
  }

  public async getAverageGradeByGroup(group: number): Promise<number> {
    return this.findAverageGrade(await this.getGrades({ where: { group } }));
  }

  public async getAverageGradeByFaculty(faculty: string): Promise<number> {
    return this.findAverageGrade(await this.getGrades({ where: { faculty } }));
  }

  public async getAverageGradeByUniversity(
    university: string,
  ): Promise<number> {
    return this.findAverageGrade(
      await this.getGrades({ where: { university } }),
    );
  }

  private async findAverageGrade(
    dbResponse: SelectGradesDBResponse,
  ): Promise<number> {
    const flatten = dbResponse.map((e) => e.gottenGrades).flat();
    return flatten.reduce((t, c) => t + c.grade, 0) / flatten.length;
  }

  private getGrades(filter: object): Promise<SelectGradesDBResponse> {
    return this.db.profile.findMany({
      where: {
        NOT: {
          group: null,
        },
      },
      select: {
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
