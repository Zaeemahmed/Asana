import { extendType, nonNull, objectType, stringArg } from 'nexus';
import { Task } from './task';

export const Board = objectType({
  name: 'Board',
  definition(t) {
    t.string('id');
    t.string('title');
    t.list.field('tasks', {
      type: Task,
      async resolve(_parent, args, ctx) {
        return await ctx.prisma.board
          .findUnique({
            where: {
              id: _parent.id,
            },
          })
          .tasks();
      },
    });
  },
});

export const boardQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('boards', {
      type: 'Board',
      resolve(_parent, args, ctx) {
        return ctx.prisma.board.findMany();
      },
    });

    t.field('board', {
      type: 'Board',
      args: {
        boardId: nonNull(stringArg()),
      },
      async resolve(_parent, args, ctx) {
        return await ctx.prisma.board.findMany({
          where: {
            boardId: args.boardId,
          },
        });
      },
    });
  },
});

export const boardMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('createBoard', {
      type: 'Board',
      args: {
        title: nonNull(stringArg()),
        id: stringArg(),
      },
      async resolve(_parent, args, ctx) {
        return ctx.prisma.task.create({
          data: {
            title: args.title,
            id: args.id,
            tasks: [],
          },
        });
      },
    });
    t.field('deleteBoard', {
      type: 'Board',
      args: {
        id: stringArg(),
      },
      async resolve(_parent, args, ctx) {
        return ctx.prisma.board.delete({
          where: {
            id: args.id,
          },
        });
      },
    });
  },
});
