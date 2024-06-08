const { GatewayIntentBits, Integration } = require('discord.js');
const {
  Client,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ModalBuilder,
  TextInputStyle,
  TextInputBuilder,ApplicationCommandOptionType
} = require('discord.js');
const { PermissionsBitField } = require('discord.js');
const config = require('./config.json');
const rolesallowed = config.roles
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
require('dotenv').config();
///////////////////
const express = require('express'); // Import the express library
const app = express(); // Launch the express app
const http = require('http'); // Import the http library
const server = http.createServer(app); // Create the 


app.get('/', (req, res) => {
  res.send('Testing...'); 
});



server.listen(3000, () => { }); // Opening the 3000 port

///////////////////////



client.on('ready', async () => {
  const { REST, Routes } = require('discord.js');

const commands = [
  {
    name: 'setup',
    description: 'setup Apply',
  },
  {
    name: "block",
    description: "Block user from using command",
    options: [
      {
        name: "block",
        description: "Please Mention User to block",
        required: true,
        type: ApplicationCommandOptionType.User,
      },
    ],
  },
  {
    name: "remove-block",
    description: "Remove block from user",
    options: [
      {
        name: "remove-block",
        description: "Please Mention User to remove block",
        required: true,
        type: ApplicationCommandOptionType.User,
      },
    ],
  },  
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

try {
  console.log('Started refreshing application (/) commands.');

  await rest.put(Routes.applicationCommands(config.idbot), { body: commands });

  console.log('Successfully reloaded application (/) commands.');
} catch (error) {
  console.error(error);
}
  console.log(`Logged in as ${client.user.tag}!`);
});

const fs = require('fs');

let blocklist = [];

try {
  const data = fs.readFileSync('blocklist.json', 'utf8');
  blocklist = JSON.parse(data);
} catch (err) {
  console.error('خطأ في قراءة الملف او الملف غير موجود قم بأنشاء الملف ووضع []', err);
}

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName === 'block') { 
    if (
      !interaction.member.permissions.has(PermissionsBitField.Flags.Administrator) &&
      !interaction.member.roles.cache.some(role => rolesallowed.includes(role.id))
    ) {
      return interaction.reply({content:"لا يمكنك استخدام هذا الأمر لأنك ليس لديك الصلاحيات أو الرتب المطلوبة.",ephemeral:true});
    }
    const member1 = interaction.options.getMember('block'); 

    if (!member1) {
      return interaction.reply('منشن شخص لـ حظره من الامر'); 
    }

    if (blocklist.includes(member1.id)) { 
      return interaction.reply('هذا الشخص محظورأ!');
    }
    interaction.reply(`تم حظر الشخص بنجاح ${member1}.`); 

    blocklist.push(member1.id); 

    fs.writeFileSync('blocklist.json', JSON.stringify(blocklist)); 
  }
    if (interaction.commandName === 'remove-block') { 
      if (
        !interaction.member.permissions.has(PermissionsBitField.Flags.Administrator) &&
        !interaction.member.roles.cache.some(role => rolesallowed.includes(role.id))
      ) {
        return interaction.reply({content:"لا يمكنك استخدام هذا الأمر لأنك ليس لديك الصلاحيات أو الرتب المطلوبة.",ephemeral:true});
      }
      let userToRemove = interaction.options.getMember('remove-block'); 
      if (!userToRemove) return interaction.reply('منشن شخص لإزالة الحظر منه'); 
      const index = blocklist.indexOf(userToRemove.id); 
      if (index !== -1) {
        try {
          await interaction.reply(`تم إزالة الحظر من الشخص بنجاح ${userToRemove}.`);
          blocklist.splice(index, 1);
          fs.writeFileSync('blocklist.json', JSON.stringify(blocklist));
        } catch (err) {
          console.error(err);
          return interaction.followUp(":x: حدث خطأ أثناء معالجة الطلب.");
        }
      } else {
        interaction.reply(`${userToRemove} هذا الشخص ليس محظورًا.`)
          .catch(err => console.error(err));
      }
    }
})



client.on('interactionCreate',async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName === 'setup') {
    if (
      !interaction.member.permissions.has(PermissionsBitField.Flags.Administrator) &&
      !interaction.member.roles.cache.some(role => rolesallowed.includes(role.id))
    ) {
      return interaction.reply({content:"لا يمكنك استخدام هذا الأمر لأنك ليس لديك الصلاحيات أو الرتب المطلوبة.",ephemeral:true});
    }
      const embed = new EmbedBuilder()
        .setTitle('> شروط التقديم على سيرفر لاند لايف للحياة الواقعية')
          .setColor('#3d82ec')
          .setImage('https://media.discordapp.net/attachments/960568073365118996/961303193546006648/738790577990270997.gif')    
        .setThumbnail('https://cdn.discordapp.com/icons/948624711053627423/95fb59ece3b42bb7025101ef702facf6.webp')
          .setDescription(`
        > 1- عندك ماين كرافت الأصلية او المكركة.
        > 2- تكون عدد رامات جهازك 6 فما فوق.
        > 3- قراءة جميع القوانين لأنك راح تدخل مقابلة و سيتم اختبارك عليهم. 
        > 4- يكون عندك مايك (اجباري)
        > 5- تدخل بالجهاز اللي بتلعب فيه
        > 
        > <#948624711712141325> \n> <#948624711712141326> \n> <#948624711712141327> \n> <#948624711712141328> \n> <#948624711712141329> \n> <#948624711712141331> 
        > 
        > 
        > **طريقة التقديم:-**
        > اضغط على الزر في الاسفل
        `)
      const row = new ActionRowBuilder()
      .addComponents(
          new ButtonBuilder()
          .setStyle(ButtonStyle.Success)
          .setLabel(' تقديم')
          .setEmoji('📑')
          .setCustomId('apply')
      )
      await interaction.channel.send({
          embeds: [embed],
          components: [row]
      })
  }
})

client.on('interactionCreate', async (interaction) => {
  if (interaction.isButton()) {
      if (interaction.customId === 'apply') {
        if (blocklist.includes(interaction.user.id)) {
          await interaction.reply({content:'أنت محظور من التقديم ولا يمكنك التقديم ابدا .',ephemeral:true});
          return;
        }    
          const modal = new ModalBuilder()
          .setTitle('التـقديـم لللأدارة')
          .setCustomId('staff_apply')
          const nameComponent = new TextInputBuilder()
          .setCustomId('q1')
          .setLabel(`${config.q1}`)
          .setPlaceholder(`اكتب اسمك`)
          .setMinLength(2)
          .setMaxLength(25)
          .setRequired(true)
          .setStyle(TextInputStyle.Short)
          const ageComponent = new TextInputBuilder()
          .setCustomId('q2')
          .setLabel(`${config.q2}`)
          .setMinLength(1)
          .setPlaceholder(`اكتب عمرك الحقيقي`)
          .setMaxLength(2)
          .setStyle(TextInputStyle.Short)
          .setRequired(true)
          const whyYou = new TextInputBuilder()
          .setCustomId(`q3`)
          .setLabel(`${config.q3}`)
          .setMinLength(2)
          .setPlaceholder(`الاسم في ماين كرافت`)
          .setMaxLength(120)
          .setStyle(TextInputStyle.Short)
          .setRequired(true)
          const q4 = new TextInputBuilder()
          .setCustomId('q4')
          .setLabel(`${config.q4}`)
          .setMaxLength(400)
          .setPlaceholder(`اقل حد للرامات 6`)
          .setStyle(TextInputStyle.Short)
          .setRequired(true)
          const q5 = new TextInputBuilder()
          .setCustomId('q5')
          .setLabel(`${config.q5}`)
          .setMaxLength(400)
          .setStyle(TextInputStyle.Short)
          .setRequired(true)
          const rows = [nameComponent, ageComponent,whyYou,q4,q5].map(
              (component) => new ActionRowBuilder().addComponents(component)
          )
          modal.addComponents(...rows);
          interaction.showModal(modal);
      }
      if (interaction.customId === 'staff_accept') {
        if (
         !interaction.member.permissions.has(PermissionsBitField.Flags.Administrator) &&
          !interaction.member.roles.cache.some(role => rolesallowed.includes(role.id))
        ) {
          return interaction.reply({content:"لا يمكنك استخدام هذا الأمر لأنك ليس لديك الصلاحيات أو الرتب المطلوبة.",ephemeral:true});
        }
        const getIdFromFooter = interaction.message.embeds[0].footer.text;
        const getMember = await interaction.guild.members.fetch(getIdFromFooter);
        try {
          await getMember.send(`**ألف مبروك! تم الموافقة على التقديم الخاص بك.:fire:\n
شرح الدخول:**`);
        } catch (error) {
          console.error('فشل في إرسال رسالة للمستخدم:', error);
        }
        try {
          await getMember.roles.add(config.staffid);
        } catch (err) {
          console.error(err);
          return interaction.reply({
            content: ":x: حدث خطأ، لا يمكن تنفيذ العملية.",
          });
        }      
          await interaction.reply({
              content: `${config.yesmessage} ${getMember.user.tag}`
          })
          const newDisabledRow = new ActionRowBuilder()
          .setComponents(
              new ButtonBuilder()
              .setCustomId('staff_accept_ended')
              .setDisabled()
              .setStyle(ButtonStyle.Success)
              .setEmoji("✅")
              .setLabel('قبول')
          )
          .addComponents(
              new ButtonBuilder()
              .setCustomId('staff_deny_ended')
              .setDisabled()
              .setEmoji("❌")
              .setStyle(ButtonStyle.Secondary)
              .setLabel('رفض')
          )
          .addComponents(
            new ButtonBuilder()
            .setCustomId('staff_block')
            .setEmoji("🚫")
            .setDisabled()
            .setStyle(ButtonStyle.Danger)
            .setLabel('حظر')
        )
          interaction.message.edit({ components: [newDisabledRow] })
      }
      if (interaction.customId === 'staff_deny') {
        if (
          !interaction.member.permissions.has(PermissionsBitField.Flags.Administrator) &&
          !interaction.member.roles.cache.some(role => rolesallowed.includes(role.id))
        ) {
          return interaction.reply({content:"لا يمكنك استخدام هذا الأمر لأنك ليس لديك الصلاحيات أو الرتب المطلوبة.",ephemeral:true});
        }
          const getIdFromFooter = interaction.message.embeds[0].footer?.text;
          const getMember = await interaction.guild.members.fetch(getIdFromFooter);
          await interaction.reply({
              content: `${config.nomessage} ${getMember.user}.`
          })
          try {
            await getMember.send('للأسف، تم رفض طلبك. نتمنى لك حظًا أفضل في المرة القادمة.');
          } catch (error) {
            console.error('فشل في إرسال رسالة للمستخدم:', error);
          }
          const newDisabledRow = new ActionRowBuilder()
          .setComponents(
            new ButtonBuilder()
            .setCustomId('staff_accept_ended')
            .setDisabled()
            .setStyle(ButtonStyle.Success)
            .setEmoji("✅")
            .setLabel('قبول')
        )
        .addComponents(
            new ButtonBuilder()
            .setCustomId('staff_deny_ended')
            .setDisabled()
            .setEmoji("❌")
            .setStyle(ButtonStyle.Secondary)
            .setLabel('رفض')
        )
        .addComponents(
          new ButtonBuilder()
          .setCustomId('staff_block')
          .setEmoji("🚫")
          .setDisabled()
          .setStyle(ButtonStyle.Danger)
          .setLabel('حظر')
      )
          interaction.message.edit({ components: [newDisabledRow] })
      }
      if (interaction.customId === 'staff_block') {
        if (
          !interaction.member.permissions.has(PermissionsBitField.Flags.Administrator) &&
          !interaction.member.roles.cache.some(role => rolesallowed.includes(role.id))
        ) {
          return interaction.reply({content:"لا يمكنك استخدام هذا الأمر لأنك ليس لديك الصلاحيات أو الرتب المطلوبة.",ephemeral:true});
        }
        const getIdFromFooter = interaction.message.embeds[0].footer?.text;
        const getMember = await interaction.guild.members.fetch(getIdFromFooter);
        if (blocklist.includes(getMember.id)) {
          return interaction.reply('هذا المستخدم موجود بالفعل في قائمة الحظر.');
        }
        interaction.reply("تم حظر المستخدم من التقديم بشكل كامل")

        blocklist.push(getMember.id);

        fs.writeFileSync('blocklist.json', JSON.stringify(blocklist));
      }
  }
  if (interaction.isModalSubmit()) {
      if (interaction.customId === 'staff_apply') {
          const q1 = interaction.fields.getTextInputValue('q1');
          const q2 = interaction.fields.getTextInputValue('q2');
          const q3 = interaction.fields.getTextInputValue('q3');
          const q4 = interaction.fields.getTextInputValue('q4');
          const q5 = interaction.fields.getTextInputValue('q5');
          interaction.reply({
              content: `${config.donesend}`,
              ephemeral: true
          })
          const staffSubmitChannel = interaction.guild.channels.cache.get(config.staffroom);
          if (!staffSubmitChannel) return;
          const embed = new EmbedBuilder()
          .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
          .setColor(config.embedcolor)
          .setFooter({ text: interaction.user.id })
          .setTimestamp()
          .setThumbnail(interaction.user.displayAvatarURL())
          .addFields(
              {
                  name: `${config.q1}`,
                  value: q1,
                  inline:true
              },
              {
                  name: `${config.q2}`,
                  value: q2,
                  inline:true
              },
              {
                  name: `${config.q3}`,
                  value: q3,
                  inline:true
              },
              {
                  name: `${config.q4}`,
                  value: q4,
                  inline:true
              },
              {
                  name: `${config.q5}`,
                  value: q5,
                  inline:true
              }
          )
          const row = new ActionRowBuilder()
          .addComponents(
              new ButtonBuilder()
              .setCustomId('staff_accept')
              .setLabel('قبول')
              .setEmoji("✅")
              .setStyle(ButtonStyle.Success)
          )
          .addComponents(
              new ButtonBuilder()
              .setCustomId('staff_deny')
              .setLabel('رفض')
              .setEmoji("❌")
              .setStyle(ButtonStyle.Secondary)
          )
          .addComponents(
            new ButtonBuilder()
            .setCustomId('staff_block')
            .setEmoji("🚫")
            .setStyle(ButtonStyle.Danger)
            .setLabel('حظر')
        )
          staffSubmitChannel.send({
              embeds: [embed],
              components: [row]
          })
      }
  }
})
client.login(process.env.TOKEN)