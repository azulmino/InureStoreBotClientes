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
  EmbedBuilder,
  PermissionFlagsBits
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

// ✅ Faltaba crear el objeto REST
const rest = new REST({ version: "10" }).setToken(TOKEN);

// 🔧 Definición de comandos
const commands = [
  new SlashCommandBuilder()
    .setName("calculargamepass")
    .setDescription("Calcula el precio de Robux incluyendo el 30% adicional para el Gamepass")
    .addIntegerOption(option =>
      option.setName("robux")
        .setDescription("Cantidad de Robux")
        .setRequired(true)
    ),

  new SlashCommandBuilder()
    .setName("precio")
    .setDescription("Muestra los precios en todos los países")
    .addIntegerOption(option =>
      option.setName("robux")
        .setDescription("Cantidad de Robux")
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName("tipo")
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
    .addStringOption(option =>
      option.setName("moneda")
        .setDescription("Seleccioná la moneda")
        .setRequired(true)
        .addChoices(
          { name: "Pesos Argentinos (ARS)", value: "ARS" },
          { name: "Dólares (USD)", value: "USD" },
          { name: "Pesos Mexicanos (MXN)", value: "MXN" },
          { name: "Pesos Colombianos (COP)", value: "COP" }
        )
    )
    .addNumberOption(option =>
      option.setName("dinero")
        .setDescription("Cantidad de dinero que tenés")
        .setRequired(true)
    ),

  new SlashCommandBuilder()
    .setName("idea")
    .setDescription("Envía una idea para el vendedor")

].map(cmd => cmd.toJSON());

// 🚀 Registrar comandos globales
(async () => {
  try {
    console.log("Registrando comandos...");
    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });
    console.log("✅ ¡Comandos registrados con éxito!");
  } catch (error) {
    console.error("❌ Error al registrar comandos:", error);
  }
})();

// 🟢 Cuando el bot se inicia
client.once(Events.ClientReady, bot => {
  console.log(`Bot cliente conectado como ${bot.user.username}`);
});

// Configuración de canales por servidor
const SERVER_CONFIG = {
  "1193400722906165298": {
    staff: "1415804979398316186",
    idea: "1230276244881539092"
  }
};

// 🎯 Un solo manejador de interacciones
client.on(Events.InteractionCreate, async (interaction) => {
  if (interaction.isChatInputCommand()) {

    // /calculargamepass
    if (interaction.commandName === "calculargamepass") {
      const robux = interaction.options.getInteger("robux");
      let total;

      switch (robux) {
        case 400: total = 572; break;
        case 500: total = 715; break;
        case 600: total = 858; break;
        case 700: total = 1000; break;
        case 1100: total = 1572; break;
        case 1200: total = 1715; break;
        case 1300: total = 2858; break;
        case 1400: total = 2000; break;
        case 2100: total = 3000; break;
        case 2800: total = 4000; break;
        case 3500: total = 5000; break;
        case 4200: total = 6000; break;
        case 4900: total = 7000; break;
        case 5600: total = 8000; break;
        case 6300: total = 9000; break;
        case 7000: total = 10000; break;
        default: total = Math.round(robux / 0.7);
      }

      return interaction.reply(`Para recibir **${robux} Robux**, necesitas hacer un pase de **${total} Robux**.`);
    }

    // /precio
    if (interaction.commandName === "precio") {
      const robux = interaction.options.getInteger("robux");
      const tipo = interaction.options.getString("tipo");

      const precios = {
        gamepass: { ARS: 12.80, USD: 0.0083, MXN: 0.155, COP: 35 },
        grupo: { ARS: 10.50, USD: 0.0083, MXN: 0.155, COP: 35 }
      };

      const paisesNombres = {
        ARS: "🇦🇷 Argentina",
        USD: "🇺🇸 Estados Unidos",
        MXN: "🇲🇽 México",
        COP: "🇨🇴 Colombia"
      };

      let texto = `**Cantidad:** ${robux} Robux\n**Método:** ${tipo === "gamepass" ? "Gamepass" : "Grupo"}\n\n`;

      for (const [pais, valor] of Object.entries(precios[tipo])) {
        texto += `${paisesNombres[pais]} ${ (robux * valor).toFixed(2) } ${pais}\n`;
      }

      const embed = new EmbedBuilder()
        .setTitle("💰 Precio de Robux")
        .setDescription(texto)
        .setColor("#FFD700");

      return interaction.reply({ embeds: [embed] });
    }

    // /calcular
    if (interaction.commandName === "calcular") {
      const moneda = interaction.options.getString("moneda");
      const dinero = interaction.options.getNumber("dinero");

      const precios = {
        gamepass: { ARS: 12.80, USD: 0.0083, MXN: 0.155, COP: 35 },
        grupo: { ARS: 10.50, USD: 0.0083, MXN: 0.155, COP: 35 }
      };

      const paisesNombres = {
        ARS: "🇦🇷 Pesos Argentinos",
        USD: "🇺🇸 Dólares",
        MXN: "🇲🇽 Pesos Mexicanos",
        COP: "🇨🇴 Pesos Colombianos"
      };

      const robuxGamepass = Math.floor(dinero / precios.gamepass[moneda]);
      const robuxGrupo = Math.floor(dinero / precios.grupo[moneda]);

      const embed = new EmbedBuilder()
        .setTitle("💰 Cálculo de Robux")
        .setColor("#FFD700")
        .setDescription(
          `Con **${dinero} ${paisesNombres[moneda]}** podés comprar:\n\n` +
          `🎮 **Gamepass:** ${robuxGamepass} Robux\n` +
          `👥 **Grupo:** ${robuxGrupo} Robux`
        )
        .setFooter({ text: "Inure Store | Conversión estimada" })
        .setTimestamp();

      return interaction.reply({ embeds: [embed] });
    }

    // /idea
    if (interaction.commandName === "idea") {
      const guildConfig = SERVER_CONFIG[interaction.guild.id];
      if (!guildConfig) {
        return interaction.reply({
          content: "⚠️ Este servidor no tiene configurado el canal de ideas.",
          ephemeral: true,
        });
      }

      const modal = new ModalBuilder()
        .setCustomId("modalIdea")
        .setTitle("💡 Comparte tu idea");

      const ideaInput = new TextInputBuilder()
        .setCustomId("ideaInput")
        .setLabel("Escribí tu idea para el vendedor")
        .setStyle(TextInputStyle.Paragraph)
        .setPlaceholder("Ej: Quiero items de este juego...")
        .setRequired(true);

      const row = new ActionRowBuilder().addComponents(ideaInput);
      modal.addComponents(row);

      return interaction.showModal(modal);
    }
  }

  // Cuando se envía el modal
  if (interaction.isModalSubmit() && interaction.customId === "modalIdea") {
    const guildConfig = SERVER_CONFIG[interaction.guild.id];
    if (!guildConfig) {
      return interaction.reply({
        content: "⚠️ Este servidor no tiene configurado el canal de staff.",
        ephemeral: true,
      });
    }

    const idea = interaction.fields.getTextInputValue("ideaInput");
    const staffChannel = await client.channels.fetch(guildConfig.staff);

    await staffChannel.send(`💡 Nueva idea de **${interaction.user.tag}**:\n> ${idea}`);

    return interaction.reply({
      content: "✅ ¡Gracias por tu idea! El staff la revisará pronto.",
      ephemeral: true
    });
  }
});

client.login(TOKEN);
