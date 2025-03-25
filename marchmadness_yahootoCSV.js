const fs = require('fs');

// Team 1 Data
const team1Name = "Alabama St";
const team1Stats = `
Jasteven WalkerF	23	2-3	0-0	2-2	0	2	2	1	1	1	1	4	6
D'Ante BassF	23	0-1	0-1	2-2	1	8	9	2	1	2	1	3	2
Kevin AlabiF	0	0-0	0-0	0-0	0	0	0	0	0	0	0	0	0
Jerquarius StanbackF	0	0-0	0-0	0-0	0	0	0	0	0	0	0	0	0
Ubong OkonC	17	1-1	0-0	0-1	1	3	4	0	1	1	1	5	2
Mario AndrewsC	0	0-0	0-0	0-0	0	0	0	0	0	0	0	0	0
Amarr KnoxG	33	8-18	2-6	0-2	0	4	4	0	1	2	0	1	18
CJ HinesG	29	3-15	1-8	2-4	0	3	3	1	2	1	0	3	9
TJ MadlockG	28	4-10	0-1	3-6	2	2	4	0	0	2	0	4	11
Micah OctaveG	17	2-3	1-2	0-0	2	3	5	1	1	1	0	5	5
Tyler MackG	12	0-4	0-4	0-0	0	1	1	1	1	0	0	1	0
Shawn FulcherG	9	3-6	2-3	0-0	0	0	0	0	1	0	0	1	8
Micah SimpsonG	8	0-1	0-0	2-2	0	1	1	0	0	0	0	0	2
Marshall JordonG	0	0-0	0-0	0-0	0	0	0	0	0	0	0	0	0
Jalen KeagoG	0	0-0	0-0	0-0	0	0	0	0	0	0	0	0	0
`;  // (Paste the full team1 block here)

// Team 2 Data
const team2Name = 'Auburn';
const team2Stats = `
Chaney JohnsonF	28	5-9	0-1	3-4	2	5	7	1	3	0	0	3	13
Ja'Heim HudsonF	4	0-1	0-0	0-0	1	0	1	0	0	0	0	0	0
Chris MooreF	4	0-0	0-0	0-0	0	0	0	0	0	0	0	0	0
Jahki HowardF	2	0-0	0-0	0-0	0	0	0	0	0	0	0	0	0
Addarin ScottF	0	0-0	0-0	0-0	0	0	0	0	0	0	0	0	0
Dylan CardwellC	20	1-1	0-0	1-4	4	4	8	0	0	1	1	3	3
Denver JonesG	31	2-6	1-5	3-5	3	1	4	6	0	0	0	1	8
Miles KellyG	29	8-16	7-15	0-0	0	3	3	0	1	0	1	3	23
Tahaad PettifordG	28	5-9	2-6	4-5	0	5	5	5	3	0	0	2	16
Blake MuschalekG	2	0-0	0-0	1-2	0	1	1	0	0	0	0	0	1
Drake CardwellG	0	0-0	0-0	0-0	0	0	0	0	0	0	0	0	0
Presley PattersonG	0	0-0	0-0	0-0	0	0	0	0	0	0	0	0	0
JP PeguesG	0	0-0	0-0	0-0	0	0	0	0	0	0	0	0	0
Joah ShayG	0	0-0	0-0	0-0	0	0	0	0	0	0	0	0	0
Reed TrappG	0	0-0	0-0	0-0	0	0	0	0	0	0	0	0	0
CJ WilliamsG	0	0-0	0-0	0-0	0	0	0	0	0	0	0	0	0
Johni BroomeF-C	27	5-9	0-3	4-9	2	9	11	1	3	0	0	3	14
Chad Baker-MazaraG-F	24	1-9	1-5	2-3	1	1	2	3	2	1	1	2	5
`;  // (Paste the full team2 block here)

// Stat columns after name/position
const statHeaders = ["min", "fg", "3pt", "ft", "off", "def", "reb", "ast", "to", "stl", "blk", "pf", "pts"];
const csvHeaders = ["first_name", "last_name", "team_name", "position"].concat(statHeaders);

// Helper function to process team data
function processTeamData(rawData, teamName) {
  const lines = rawData.trim().split('\n');
  return lines.map(line => {
    const columns = line.split('\t');
    const nameWithPos = columns[0].trim();

    // Extract position (last uppercase letter(s))
    const match = nameWithPos.match(/^(.+?)([A-Z\-]+)$/);
    let firstName = '', lastName = '', position = '';
    if (match) {
      const fullName = match[1].trim();
      position = match[2].trim();
      const nameParts = fullName.split(' ');
      firstName = nameParts.slice(0, -1).join(' ');
      lastName = nameParts.slice(-1)[0];
    } else {
      // Fallback in case regex fails
      firstName = nameWithPos;
      lastName = '';
      position = '';
    }

    // Grab the stats
    const stats = columns.slice(1);
    return [firstName, lastName, teamName, position].concat(stats);
  });
}

// Process both teams
const team1Players = processTeamData(team1Stats, team1Name);
const team2Players = processTeamData(team2Stats, team2Name);

// Combine and generate CSV
const allPlayers = team1Players.concat(team2Players);
const csvRows = [csvHeaders.join(',')].concat(
  allPlayers.map(row => row.join(','))
);

// Write the CSV to a file
const finalCSV = csvRows.join('\n');
fs.writeFileSync('AlabamaVAuburn.csv', finalCSV, 'utf8');

console.log('✅ CSV saved as AlabamaVAuburn.csv');
