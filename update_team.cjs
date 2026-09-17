
const fs = require('fs');

const processedFiles = [('Kiran SN', 'kiran_sn'), ('Mehdi Raza ', 'mehdi_raza_'), ('Sudeepthi', 'sudeepthi'), ('Aswajith M', 'aswajith_m'), ('Anusha', 'anusha'), ('Meenakshi Rawat', 'meenakshi_rawat'), ('Darshan Mumbai', 'darshan'), ('Mala Panda Mumbai ', 'mala_panda_'), ('SUMAN - Executive Student Advisor', 'suman'), ('Preethi Naidu', 'preethi_naidu'), ('SOUMYA - Executive Student Advisor', 'soumya'), ('Prathiba Maria Caroline', 'prathiba_maria_caroline'), ('ANON - Executive Student Advisor', 'anon'), ('Tharun M', 'tharun_m'), ('Keerthana', 'keerthana'), ('Anuja D img', 'anuja_d'), ('Swapna Pic', 'swapna'), ('Sanjana Soni', 'sanjana_soni'), ('Udaya Vikram', 'udaya_vikram'), ('Ganesh B S', 'ganesh_b_s'), ('Vibha', 'vibha'), ('Ruchita Patil Photo', 'ruchita_patil'), ('Aravind BR', 'aravind_br'), ('Sharathi R', 'sharathi_r'), ('Siva Priya - Executive Student Advisor', 'siva_priya')];

let teamData = fs.readFileSync('src/data/teamData.js', 'utf8');

for (const [original, cleanName] of processedFiles) {
    // Generate a regex to find the team member. The original name might be 'Aravind BR', 'Siva Priya', etc.
    let nameToMatch = original.replace(/ - Executive Student Advisor/ig, '').replace(/ Mumbai/ig, '').replace(/ Photo/ig, '').replace(/ img/ig, '').replace(/ Pic/ig, '').trim();
    
    // Attempt fuzzy match for the name in the teamData.js file
    // For example, if nameToMatch is "Preethi Naidu", but the file has "Preethi M". We might just match first name.
    let firstName = nameToMatch.split(' ')[0];
    
    // We can use a regex to match the object in TEAM_MEMBERS
    // e.g. { id: "...", name: "Siva Priya", ... }
    const regex = new RegExp(`({[^}]*name:\s*["']([^"']*${firstName}[^"']*)["'][^}]*)(})`, 'i');
    
    if (regex.test(teamData)) {
        console.log(`Matched ${nameToMatch} to JS data using ${firstName}`);
        teamData = teamData.replace(regex, (match, p1, p2, p3) => {
            // Check if it already has an image property
            if (p1.includes('image:')) return match;
            return p1 + `, image: "/${cleanName}.png" ` + p3;
        });
    } else {
        console.log(`Could not find a match for ${nameToMatch}`);
    }
}

fs.writeFileSync('src/data/teamData.js', teamData);
