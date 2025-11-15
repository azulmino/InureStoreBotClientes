await interaction.deferReply({ ephemeral: true });
await interaction.deleteReply(); // ocultar el "pensando..."

return interaction.showModal(modal);
