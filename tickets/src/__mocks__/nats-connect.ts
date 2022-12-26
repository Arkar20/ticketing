export const natsWrapper = {
  stan: {
    publish: (subject: string, data: string, callback: () => void) => {
      callback();
    },
  },
};
