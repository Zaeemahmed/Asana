import { enumType, extendType, nonNull, objectType, stringArg } from 'nexus';
import { Task } from './task';

export const User = objectType({
    name: "User",
    definition(t) {
        t.string("id")
        t.string("name")
        t.string("email")
        t.field("role", { type: Role })
        t.string("image")
        t.list.field('tasks', {
            type : Task,
            async resolve(_parent, args, ctx) {
                return await ctx.prisma.user.findUnique({
                    where : {
                        id: _parent.id
                    }
                })
                .tasks()
            }
        })
    }
})

export const UsersQuery = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.list.field('users', {
            type: 'User',
            resolve(_parent, args, ctx) {
                return ctx.prisma.user.findMany()
            }
        })

        t.field("user", {
            type: 'User',
            args: {
                email: nonNull(stringArg())
            },
            async resolve(_parent, args, ctx) {
                return await ctx.prisma.task.findMany({
                    where : {
                        email: args.email
                    }
                })
            }
        })
    }
})

const Role = enumType({
    name: 'Role',
    members: ['FREE', 'SUBSCRIBED']
})

// export const TasksMutation = extendType({
//     type: "Mutation",
//     definition(t) {
//         t.nonNull.field('createTask', {
//             type: "Task",
//             args: {
//                 title: nonNull(stringArg()),
//                 description: stringArg(),
//                 userId: stringArg(),
//                 id: stringArg(),
//                 status: stringArg()
//             },
//             async resolve(_parent, args, ctx) {
//                 return ctx.prisma.task.create({
//                     data: {
//                         title: args.title,
//                         description: args.description,
//                         userId: args.userId,
//                         id: args.id,
//                         status: args.status
//                     }
//                 })
//             }
//         })

//         t.field('updateTask', {
//             type: "Task",
//             args: {
//                 title: nonNull(stringArg()),
//                 description: stringArg(),
//                 userId: stringArg(),
//                 id: stringArg(),
//                 status: stringArg()
//             },
//             async resolve(_parent, args, ctx) {
//                 return ctx.prisma.task.update({
//                     where: {
//                         id: args.id
//                     },
//                     data: {
//                         title: args.title,
//                         description: args.description,
//                         userId: args.userId,
//                         id: args.id,
//                         status: args.status
//                     }
//                 })
//             }
//         })
//         t.field('deleteTask', {
//             type: "Task",
//             args: {
//                 id: stringArg(),
//             },
//             async resolve(_parent, args, ctx) {
//                 return ctx.prisma.task.delete({
//                     where: {
//                         id: args.id
//                     },
//                 })
//             }
//         })
//     }
// })
