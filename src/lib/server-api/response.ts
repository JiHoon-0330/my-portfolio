export async function response(func: () => Promise<any>) {
  try {
    const data = await func();

    return { success: true, data };
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return { success: false };
  }
}
