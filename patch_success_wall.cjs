const fs = require('fs');
const file = 'src/components/StudentSuccessWall.jsx';
let content = fs.readFileSync(file, 'utf8');

// 1. DestinationShowcase
content = content.replace('function DestinationShowcase() {', 'function DestinationShowcase({ activeIndex, onSelectIndex }) {');
content = content.replace(/const \[active, setActive\] = useState\(0\);/g, '');
content = content.replace(/active/g, 'activeIndex');
content = content.replace(/setActive/g, 'onSelectIndex');

// 2. GlassCarouselLoop
content = content.replace('function GlassCarouselLoop() {', `function GlassCarouselLoop({ activeCountryIndex }) {
  const countryFlag = DESTINATIONS[activeCountryIndex].flag;
  let filteredStudents = STUDENTS.filter(s => s.country === countryFlag);
  if (filteredStudents.length === 0) filteredStudents = STUDENTS;
  while (filteredStudents.length > 0 && filteredStudents.length < 8) {
    filteredStudents = [...filteredStudents, ...filteredStudents];
  }
  const displayStudents = filteredStudents;`);

content = content.replace(/STUDENTS\.map/g, 'displayStudents.map');
content = content.replace(/STUDENTS\.length/g, 'displayStudents.length');

// 3. Add explore button
const exploreButtonHTML = `
      {/* Explore Button and Gap */}
      <div style={{ textAlign: 'center', marginTop: 60, marginBottom: 120 }}>
        <button style={{
          background: 'transparent',
          border: '1px solid rgba(255,255,255,0.2)',
          color: '#fff',
          padding: '16px 40px',
          borderRadius: '100px',
          fontSize: '0.9rem',
          letterSpacing: 2,
          textTransform: 'uppercase',
          cursor: 'pointer',
          transition: 'all 0.3s'
        }}
        onMouseOver={(e) => {
          e.target.style.background = '#fff';
          e.target.style.color = '#000';
        }}
        onMouseOut={(e) => {
          e.target.style.background = 'transparent';
          e.target.style.color = '#fff';
        }}>
          Explore All Success Stories
        </button>
      </div>
`;
content = content.replace('</div>\n  );\n}\n\n/* ══════════════════════════════════════════════════════════════\n   Process Journey Steps', exploreButtonHTML + '</div>\n  );\n}\n\n/* ══════════════════════════════════════════════════════════════\n   Process Journey Steps');

// 4. Update StudentSuccessWall to hold state
content = content.replace('export default function StudentSuccessWall() {', `export default function StudentSuccessWall() {
  const [activeCountryIndex, setActiveCountryIndex] = useState(0);`);
content = content.replace('<DestinationShowcase />', '<DestinationShowcase activeIndex={activeCountryIndex} onSelectIndex={setActiveCountryIndex} />');
content = content.replace('<GlassCarouselLoop />', '<GlassCarouselLoop activeCountryIndex={activeCountryIndex} />');

fs.writeFileSync(file, content);
