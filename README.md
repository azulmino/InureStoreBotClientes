if (message.deletable) {
    try {
        await message.delete();
    } catch (err) {
        if (err.code !== 10008) console.error(err);
    }
}

