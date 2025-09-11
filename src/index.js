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
    intents: [GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent
    ]
});

const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
//const GUILD_ID = process.env.GUILD_ID;

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
              { name: "Pesos Colombianos (COP)", value: "COP" },
            )
        )
        .addNumberOption(option =>
          option.setName("dinero")
            .setDescription("Cantidad de dinero que tenés")
            .setRequired(true)
        )

].map(cmd => cmd.toJSON());

const rest = new REST({ version: "10" }).setToken(TOKEN);

(async () => {
    try {
        console.log("Registrando comandos...");
        await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });
        console.log("¡Comandos registrados con éxito!");
    } catch (error) {
        console.error(error);
    }
})();

client.once(Events.ClientReady, bot => {
    console.log(`Bot cliente conectado como ${bot.user.username}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isCommand()) return;
    

    if (interaction.commandName === "calculargamepass") {
        const robux = interaction.options.getInteger("robux");
        let total;

        switch (robux) {
            case 700: total = 1000; break;
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

        await interaction.reply(`Para recibir **${robux} Robux**, necesitas hacer un pase de **${total} Robux**.`);
    }

    if (interaction.commandName === "precio") {
        const robux = interaction.options.getInteger("robux");
        const tipo = interaction.options.getString("tipo");

        const precios = {
            gamepass: { ARS: 11.70, USD: 0.0083, MXN: 0.155, COP: 35 },
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

        await interaction.reply({ embeds: [embed] });
    }

    // /calculardinero
  if (interaction.commandName === "calcular") {
    const moneda = interaction.options.getString("moneda");
    const dinero = interaction.options.getNumber("dinero");

    const precios = {
      gamepass: { ARS: 11.70, USD: 0.0083, MXN: 0.155, COP: 35 },
      grupo: { ARS: 10.50, USD: 0.0083, MXN: 0.155, COP: 35 }
    };

    const paisesNombres = {
      ARS: "🇦🇷 Pesos Argentinos",
      USD: "🇺🇸 Dólares",
      MXN: "🇲🇽 Pesos Mexicanos",
      COP: "🇨🇴 Pesos Colombianos"
    };

    if (!precios.gamepass[moneda]) {
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("❌ Moneda no soportada")
            .setDescription("Por ahora solo se aceptan ARS, USD, MXN y COP.")
            .setColor("Red")
        ],
        flags: 64
      });
    }

    const robuxGamepass = Math.floor(dinero / precios.gamepass[moneda]);
    const robuxGrupo = Math.floor(dinero / precios.grupo[moneda]);

    const embed = new EmbedBuilder()
      .setTitle("💰 Cálculo de Robux")
      .setColor("#FFD700") // color dorado
      .setDescription(
        `Con **${dinero} ${paisesNombres[moneda]}** podés comprar:\n\n` +
        `🎮 **Gamepass:** ${robuxGamepass} Robux\n` +
        `👥 **Grupo:** ${robuxGrupo} Robux`
      )
      .setFooter({ text: "Inure Store | Conversión estimada" })
      .setTimestamp();

    return interaction.reply({ embeds: [embed] });
  }

});


// Configuración
const STAFF_CHANNEL_ID = "1415804979398316186"; // <-- Canal privado del staff
const IDEA_CHANNEL_ID = "1230276244881539092"; 

client.once(Events.ClientReady, async () => {
  console.log(`✅ Bot conectado como ${client.user.tag}`);

  // 🔹 Registrar comando /idea automáticamente
  const commands = [
    new SlashCommandBuilder()
      .setName("idea")
      .setDescription("Envía una idea para el vendedor"),
  ].map(cmd => cmd.toJSON());

  const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

  try {
    console.log("⌛ Registrando comando /idea...");
    await rest.put(
      Routes.applicationCommands(client.user.id), 
      { body: commands }
    );
    console.log("✅ Comando registrado con éxito.");
  } catch (error) {
    console.error("❌ Error al registrar comandos:", error);
  }
});

// Evento para /idea
client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "idea") {
    if (!interaction.channel || interaction.channel.id !== IDEA_CHANNEL_ID) {
      return interaction.reply({
        content: "⚠️ Este comando solo se puede usar en el canal #cmd.",
        flags: 64,
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

    await interaction.showModal(modal);
  }
});

// Evento cuando envían el modal
client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isModalSubmit()) return;

  if (interaction.customId === "modalIdea") {
    const idea = interaction.fields.getTextInputValue("ideaInput");
    const staffChannel = await client.channels.fetch(STAFF_CHANNEL_ID);

    await staffChannel.send(`💡 Nueva idea de **${interaction.user.tag}**:\n> ${idea}`);

    await interaction.reply({
      content: "✅ ¡Gracias por tu idea! El staff la revisará pronto.",
      flags: 64
    });
  }
});

client.login(TOKEN);
