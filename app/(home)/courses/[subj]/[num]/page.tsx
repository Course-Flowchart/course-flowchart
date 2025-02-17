import { Suspense } from "react";

import { DownloadIcon } from "@radix-ui/react-icons";

//export function generateMetadata({ params }) {
//  return {
//    title: `${params.subj.toUpperCase()} ${params.num}`,
//  };
//}

async function get_full(uuid: string) {
  console.log(
    "https://app.coursedog.com/api/v1/cm/umn_umntc_peoplesoft/courses/" + uuid
  )
  const res = await fetch(
    "https://app.coursedog.com/api/v1/cm/umn_umntc_peoplesoft/courses/" + uuid
  );
  if (!res.ok) {
    return null;
  }
  return await res.json();
}

async function FullInfo({ course }: { course: Course }) {
  // non-null: Page function should error first
  const full = await get_full(course.uuid);
  const data = {
    id: full.id,
    code: full.code,
    subject: full.subjectCode,
    number: full.courseNumber,
    credits: full.credits.numberOfCredits,
    fullname: full.longName,
    name: full.name,
    season: full.courseTypicallyOffered,
  };
  return (
    <>
      <LocalInfo course={course} />
      <pre className="text-sm text-wrap">{JSON.stringify(data, null, 2)}</pre>
    </>
  );
}

function LocalInfo({ course }: { course: Course }) {
  return (
    <>
      <div id="code" className="text-xl font-bold text-gray-800">
        {course.code} {/* writing-intensive badge */} {/* honors badge */}
      </div>
      <div id="name" className="text-lg font-semibold text-gray-700">
        {course.fullname}
      </div>
      <div id="info" className="text-gray-600">
        {/*reformat(course.info, true)*/}
        {course.info}
      </div>
    </>
  );
}

const InfoSection = ({ course }: { course: Course }) => {
  return (
    <div className="lg:order-2 order-2 bg-white rounded-lg shadow p-6 space-y-4">
      <Suspense fallback={<LocalInfo course={course} />}>
        <FullInfo course={course} />
      </Suspense>
    </div>
  );
};

export default function Page({ params }) {
  //const subj: string = params.subj.toUpperCase();
  //const num: string = params.num.toUpperCase();
  //if (!subjects.includes(subj)) return notFound();
  //const course = course_get(subj, num);
  //if (!course) return notFound();

  const course = {
    "uuid": "0036751-2024-09-03",
    "id": "003675",
    "subject": "CSCI",
    "number": "4041",
    "honors": false,
    "writing": false,
    "name": "Algorithms and Data Structures",
    "prereq": {
      "and": [
        {
          "or": [
            "809667",
            "810346"
          ]
        },
        "003672"
      ]
    }
  }

  const build: BuildOptions = {
    includes: [course.uid],
    decimate_orphans: false,
  };

  return (
    <main className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-screen bg-gray-50 p-6">
      <section id="graph" className="lg:order-1 order-1 bg-white rounded-lg shadow p-4 flex-grow">
        <header className="flex justify-between items-center mb-4">
          <div className="text-red-500 font-bold text-sm">
            *Possible Prerequisites
          </div>
          <button className="p-2 rounded bg-gray-100 hover:bg-gray-200">
            <DownloadIcon />
          </button>
        </header>
        {/*
          <Graph build={build} className="bg-gray-100 rounded-md p-4 min-h-[50vh]" />
        */}
      </section>
      <InfoSection course={course} />
    </main>
  );
}
