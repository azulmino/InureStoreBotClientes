const {
  Client,
  GatewayIntentBits,
  Events,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
  REST,
  Routes,
  SlashCommandBuilder,
  EmbedBuilder
} = require("discord.js");

require("dotenv").config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;

const rest = new REST({ version: "10" }).setToken(TOKEN);

// -----------------------------------------
// COMANDOS
// -----------------------------------------

const commands = [
  new SlashCommandBuilder()
    .setName("calculargamepass")
    .setDescription("Calcula el precio de Robux incluyendo el 30% adicional para el Gamepass")
    .addIntegerOption(opt =>
      opt.setName("robux").setDescription("Cantidad de Robux").setRequired(true)
    ),

  new SlashCommandBuilder()
    .setName("precio")
    .setDescription("Muestra los precios en todos los países")
    .addIntegerOption(opt =>
      opt.setName("robux").setDescription("Cantidad de Robux").setRequired(true)
    )
    .addStringOption(opt =>
      opt.setName("tipo")
        .setDescription("Forma de compra")
        .setRequired(true)
        .addChoices(
          { name: "Gamepass", value: "gamepass" },
          { name: "Grupo", value: "grupo" }
        )
    ),

  new SlashCommandBuilder()
    .setName("calcular")
    .setDescription("Calcula cuántos Robux podés comprar con tu dinero")
    .addStringOption(opt =>
      opt.setName("moneda")
        .setDescription("Seleccioná la moneda")
        .setRequired(true)
        .addChoices(
          { name: "Pesos Argentinos (ARS)", value: "ARS" },
          { name: "Dólares (USD)", value: "USD" },
          { name: "Pesos Mexicanos (MXN)", value: "MXN" },
          { name: "Pesos Colombianos (COP)", value: "COP" }
        )
    )
    .addNumberOption(opt =>
      opt.setName("dinero")
        .setDescription("Cantidad de dinero que tenés")
        .setRequired(true)
    ),

  new SlashCommandBuilder()
    .setName("idea")
    .setDescription("Envía una idea para el vendedor")
].map(c => c.toJSON());

(async () => {
  try {
    console.log("Registrando comandos...");
    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });
    console.log("✅ Comandos registrados.");
  } catch (error) {
    console.error("❌ Error:", error);
  }
})();

client.once(Events.ClientReady, bot => {
  console.log(`Bot conectado como ${bot.user.username}`);
});

// -----------------------------------------
// CONFIG SERVIDORES
// -----------------------------------------

const SERVER_CONFIG = {
  "1193400722906165298": {
    staff: "1415804979398316186"
  }
};

// -----------------------------------------
// HANDLER DE INTERACCIONES
// -----------------------------------------

client.on(Events.InteractionCreate, async (interaction) => {

  // ---------------------------------------------------------------------
  // ⭐ SLASH COMMANDS
  // ---------------------------------------------------------------------
  if (interaction.isChatInputCommand()) {

    // *******************************
    // /calculargamepass
    // *******************************
    if (interaction.commandName === "calculargamepass") {
      const robux = interaction.options.getInteger("robux");

      const conversion = {
        400: 572, 500: 715, 600: 858, 700: 1000,
        1100: 1572, 1200: 1715, 1300: 2858, 1400: 2000,
        2100: 3000, 2800: 4000, 3500: 5000, 4200: 6000,
        4900: 7000, 5600: 8000, 6300: 9000, 7000: 10000
      };

      const total = conversion[robux] ?? Math.round(robux / 0.7);

      return interaction.reply(
        `Para recibir **${robux} Robux**, necesitas un pase de **${total} Robux**.`
      );
    }

    // *******************************
    // /precio
    // *******************************
    if (interaction.commandName === "precio") {
      const robux = interaction.options.getInteger("robux");
      const tipo = interaction.options.getString("tipo");

      const precios = {
        gamepass: { ARS: 12.80, USD: 0.0083, MXN: 0.155, COP: 35 },
        grupo:    { ARS: 11.00, USD: 0.0083, MXN: 0.155, COP: 35 }
      };

      const paisNombre = {
        ARS: "🇦🇷 Argentina",
        USD: "🇺🇸 Estados Unidos",
        MXN: "🇲🇽 México",
        COP: "🇨🇴 Colombia"
      };

      let txt = `**Cantidad:** ${robux} Robux\n**Método:** ${tipo}\n\n`;

      for (const [pais, valor] of Object.entries(precios[tipo])) {
        txt += `${paisNombre[pais]}: ${(robux * valor).toFixed(2)} ${pais}\n`;
      }

      const embed = new EmbedBuilder()
        .setTitle("💰 Precio de Robux")
        .setColor("#FFD700")
        .setDescription(txt);

      return interaction.reply({ embeds: [embed] });
    }

    // *******************************
    // /calcular
    // *******************************
    if (interaction.commandName === "calcular") {
      const moneda = interaction.options.getString("moneda");
      const dinero = interaction.options.getNumber("dinero");

      const precios = {
        gamepass: { ARS: 12.80, USD: 0.0083, MXN: 0.155, COP: 35 },
        grupo:    { ARS: 11.00, USD: 0.0083, MXN: 0.155, COP: 35 }
      };

      const nombre = {
        ARS: "🇦🇷 ARS",
        USD: "🇺🇸 USD",
        MXN: "🇲🇽 MXN",
        COP: "🇨🇴 COP"
      };

      const robuxGamepass = Math.floor(dinero / precios.gamepass[moneda]);
      const robuxGrupo = Math.floor(dinero / precios.grupo[moneda]);

      const embed = new EmbedBuilder()
        .setTitle("💰 Cálculo de Robux")
        .setColor("#FFD700")
        .setDescription(
          `Con **${dinero} ${nombre[moneda]}** podés comprar:\n\n` +
          `🎮 **Gamepass:** ${robuxGamepass} Robux\n` +
          `👥 **Grupo:** ${robuxGrupo} Robux`
        );

      return interaction.reply({ embeds: [embed] });
    }

    // *******************************
    // /idea
    // *******************************
    if (interaction.commandName === "idea") {
      const config = SERVER_CONFIG[interaction.guild.id];

      if (!config)
        return interaction.reply({
          content: "⚠️ Este servidor no tiene un canal configurado.",
          ephemeral: true
        });

      const modal = new ModalBuilder()
        .setCustomId("modalIdea")
        .setTitle("💡 Comparte tu idea");

      const input = new TextInputBuilder()
        .setCustomId("ideaInput")
        .setLabel("Escribí tu idea")
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(true);

      const row = new ActionRowBuilder().addComponents(input);

      modal.addComponents(row);

      return interaction.showModal(modal);
    }
  }

  // ---------------------------------------------------------------------
  // ⭐ MODAL
  // ---------------------------------------------------------------------
  if (interaction.isModalSubmit() && interaction.customId === "modalIdea") {
    const cfg = SERVER_CONFIG[interaction.guild.id];

    if (!cfg)
      return interaction.reply({
        content: "⚠️ No hay canal configurado.",
        ephemeral: true
      });

    const idea = interaction.fields.getTextInputValue("ideaInput");
    const staffChannel = await client.channels.fetch(cfg.staff);

    await staffChannel.send(`💡 Nueva idea de **${interaction.user.tag}**:\n> ${idea}`);

    return interaction.reply({
      content: "✅ ¡Tu idea fue enviada!",
      ephemeral: true
    });
  }
});

// -----------------------------------------

client.login(TOKEN);
