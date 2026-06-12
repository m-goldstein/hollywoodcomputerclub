const meetups = [
  "Retro Macintosh, beige boxes, weird laptops, UNIX workstations",
  "Arcade boards, consoles, controllers, CRTs, repairs, restorations",
  "Homebrew software, small hardware projects, demos, talks, war stories",
  "Manuals, zines, disks, ROMs, BBS memories, and practical nostalgia",
];

const rules = [
  "Bring curiosity. Beginners, collectors, engineers, artists, and tinkerers are welcome.",
  "Show-and-tell is encouraged. Working hardware is excellent; broken hardware is also interesting.",
  "Questions are welcome. If you are not sure whether your project fits, ask Max.",
  "Respect the venue, the gear, and the people. Ask before touching someone else's machine.",
  "Meetings are monthly or quarterly depending on schedules and room availability.",
];

export default function Home() {
  return (
    <main className="page-shell">
      <header className="site-header" id="top">
        <pre className="ascii-logo" aria-label="Hollywood Computer Club">
{String.raw`
 _   _  ____  _     _  __   ___        _____   ___  ____  ____  
| | | |/ ___|| |   | | \ \ / / |      / / _ \ / _ \|  _ \|  _ \ 
| |_| | |    | |   | |  \ V /| | /| / / | | | | | | |_) | | | |
|  _  | |___ | |___| |___| | | |/ |/ /| |_| | |_| |  _ <| |_| |
|_| |_|\____||_____|_____|_| |__/|__/  \___/ \___/|_| \_\____/ 
`}
        </pre>
        <p className="terminal-line">
          <span>HOLLYWOOD COMPUTER CLUB</span>
          <span>HOLLYWOOD, FL</span>
          <span>EST. FOR PEOPLE WHO STILL LIKE MACHINES</span>
        </p>
      </header>

      <nav className="nav-strip" aria-label="Page sections">
        <a href="#about">about</a>
        <a href="#meet">meet</a>
        <a href="#bring">bring</a>
        <a href="#notes">notes</a>
        <a href="#contact">contact</a>
      </nav>

      <section className="notice">
        <p>
          A monthly/quarterly gathering for hobbyists, enthusiasts, engineers,
          collectors, and anyone who wants to revel in computer nostalgia.
        </p>
      </section>

      <section className="section-grid" id="about">
        <h1>Hollywood Computer Club</h1>
        <div>
          <p>
            Hollywood Computer Club is a local meetup in Hollywood, Florida for
            people who like computers as objects, tools, instruments, puzzles,
            history, and culture.
          </p>
          <p>
            The room is for old tech, new projects, half-working projects,
            strange interfaces, recovered machines, useful hacks, forgotten
            manuals, and the stories behind all of it. If you have ever wanted
            to boot an old Macintosh, inspect an arcade PCB, debug something for
            fun, swap notes with other computer people, or talk about the
            internet before it became smooth, this is for you.
          </p>
        </div>
      </section>

      <section className="section-grid" id="meet">
        <h2>Where We Meet</h2>
        <div>
          <p>
            Meetings are held in Hollywood, Florida at the Lippman Center.
            Exact dates, room details, and any special setup notes should be
            checked with the organizer before hauling in heavy equipment.
          </p>
          <table>
            <tbody>
              <tr>
                <th scope="row">Venue</th>
                <td>Lippman Center</td>
              </tr>
              <tr>
                <th scope="row">City</th>
                <td>Hollywood, FL</td>
              </tr>
              <tr>
                <th scope="row">Cadence</th>
                <td>Monthly / quarterly</td>
              </tr>
              <tr>
                <th scope="row">Format</th>
                <td>Show-and-tell, demos, conversation, repairs, nostalgia</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="section-grid" id="bring">
        <h2>What Shows Up</h2>
        <ul>
          {meetups.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="section-grid">
        <h2>Who It Is For</h2>
        <div className="columns">
          <p>
            You do not need a collection, a perfect restoration, or a finished
            project. The club is for people who are curious, generous with what
            they know, and interested in comparing notes in person.
          </p>
          <p>
            Bring a machine, bring a story, bring a question, or just show up
            and listen. The best meetings usually have a mix of experts,
            beginners, collectors, builders, and someone trying to identify a
            cable, board, disk, or mystery port.
          </p>
        </div>
      </section>

      <section className="section-grid" id="contact">
        <h2>Contact</h2>
        <div>
          <p>
            Questions, demo ideas, organizing help, and presentation proposals
            should go to Max at{" "}
            <a href="mailto:hollywoodcomputerclub@gmail.com">
              hollywoodcomputerclub@gmail.com
            </a>
            .
          </p>
          <p>
            Reach out if you want to bring something unusual, need a hand
            planning a setup, want to help run a future meeting, or have a short
            talk, repair session, restoration story, software demo, or hardware
            show-and-tell for the next gathering.
          </p>
        </div>
      </section>

      <section className="section-grid" id="notes">
        <h2>Local Notes</h2>
        <ul>
          {rules.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="bbs-box" aria-label="Bulletin board">
        <h2>Bulletin Board</h2>
        <p>
          Want to give a short demo, bring a project, help organize, or announce
          a repair night? Send a note to Max before the next gathering.
        </p>
        <p className="status-line">
          CONTACT: hollywoodcomputerclub@gmail.com / STATUS: accepting demos /
          collecting old hardware stories / checking extension cords
        </p>
      </section>

      <footer>
        <p>
          Hollywood Computer Club // Hollywood, Florida // Max:
          hollywoodcomputerclub@gmail.com
        </p>
        <a href="#top">back to top</a>
      </footer>
    </main>
  );
}
