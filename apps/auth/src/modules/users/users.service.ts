import { DatabaseService } from "@database";
import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class UsersService {
    constructor(private readonly db: DatabaseService) { }

    async findAll(args: Prisma.UserFindManyArgs) {
        if (args.take) {
            const count = await this.db.user.count({ where: args.where });
            const currentPage = ((args.skip ?? 0) / args.take) + 1;
            const totalPages = Math.ceil(count / args.take);
            return {
                users: await this.db.user.findMany(args),
                paginator: { count, currentPage, totalPages }
            }
        }

        return { users: await this.db.user.findMany(args), paginator: undefined };
    }

    findOne(args: Prisma.UserFindUniqueArgs) {
        return this.db.user.findUnique(args);
    }

    async findOneOrError(args: Prisma.UserFindUniqueArgs) {
        const user = await this.db.user.findUnique(args);
        
        if (!user) {
            return {
                error: {
                    code: 404,
                    message: "User is not found",
                }
            }
        }

        return { user };
    }

    async create(args: Prisma.UserCreateArgs) {
        try {
            const user = await this.db.user.create(args);

            return { user };
        } catch (error) {
            return {
                error: {
                    code: 400,
                    message: this.db.handle(error)
                }
            }
        }
    }

    async update(args: Prisma.UserUpdateArgs) {
        const results = await this.findOneOrError({ where: args.where });

        if (results.error) {
            return { error: results.error };
        }

        try {
            const user = await this.db.user.update(args);

            return { user };
        } catch (error) {
            return {
                error: {
                    code: 400,
                    message: this.db.handle(error)
                }
            }
        }
    }

    async delete(args: Prisma.UserDeleteArgs) {
        const results = await this.findOneOrError({ where: args.where });

        if (results.error) {
            return { error: results.error };
        }

        try {
            await this.db.user.delete(args);
        } catch (error) {
            return {
                error: {
                    code: 400,
                    message: this.db.handle(error)
                }
            }
        }
    }

    async getSettingsOrError(args: Prisma.SettingsFindUniqueArgs) {
        const settings = await this.db.settings.findUnique(args);

        if (!settings) {
            return { error: { code: 404, message: "User Settings is not found" } };
        }

        return { settings };
    }

    async updateSettings(args: Prisma.SettingsUpdateArgs) {
        const result = await this.getSettingsOrError(args);

        if (result.error) {
            return { error: result.error };
        }

        try {
            const settings = await this.db.settings.update(args);

            return { settings };
        } catch (error) {
            return {
                error: {
                    code: 400,
                    message: this.db.handle(error)
                }
            }
        }
    }
}