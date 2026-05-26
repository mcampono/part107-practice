const quizConfigs = [
  {
    id: "faa-regs-part-1",
    title: "FAA Regs Part 1",
    totalQuestions: 10,
    questionGroups: [
      { bank: "FAA Part 107 Background", count: 1 },
      { bank: "Part 107 Eligibility", count: 3 },
      { bank: "Drone Registration", count: 2 },
      { bank: "Remote PIC", count: 1 },
      { bank: "Accidents", count: 1 },
      { bank: "Deviation", count: 1 },
      { bank: "Hazards", count: 1 }
    ]
  },
  {
    id: "faa-regs-part-2",
    title: "FAA Regs Part 2",
    totalQuestions: 8,
    questionGroups: [
      { bank: "VLOS", count: 1 },
      { bank: "Airspace Restrictions", count: 2 },
      { bank: "Pre-Flight Requirements", count: 1 },
      { bank: "Waivers and Compliance", count: 2 },
      { bank: "Remote ID", count: 2 }
    ]
  },
  {
    id: "operating-limitations-and-flying-at-night",
    title: "Operating Limitations and Flying at Night",
    totalQuestions: 10,
    questionGroups: [
      { bank: "Flying at Night", count: 2 },
      { bank: "Daylight Operations", count: 1 },
      { bank: "Moving Vehicle Operations", count: 1 },
      { bank: "Multiple UAV Operations", count: 1 },
      { bank: "See and Avoid Operations", count: 1 },
      { bank: "Speed Limit Operations", count: 1 },
      { bank: "Altitude Limitations", count: 1 },
      { bank: "Cloud Clearance", count: 1 },
      { bank: "Visibility", count: 1 }
    ]
  },
  {
    id: "operations-over-people",
    title: "Operations Over People",
    totalQuestions: 5,
    questionGroups: [
      { bank: "OOP - General", count: 1 },
      { bank: "OOP - Categories", count: 3 },
      { bank: "OOP - Over Vehicles", count: 1 }
    ]
  },
  {
    id: "radio-communications",
    title: "Radio Communications",
    totalQuestions: 10,
    questionGroups: [
      { bank: "Airplane Registration and Call Signs", count: 2 },
      { bank: "Common Radio Frequencies", count: 2 },
      { bank: "Communication Procedures", count: 2 },
      { bank: "Radio Phraseology", count: 2 },
      { bank: "UNICOM and ATIS", count: 2 }
    ]
  },
  {
    id: "sectional-charts-part-1",
    title: "Sectional Charts Part 1",
    totalQuestions: 13,
    questionGroups: [
      { bank: "AGL vs MSL", count: 1 },
      { bank: "National Airspace", count: 1 },
      { bank: "Sectional Charts Intro", count: 5 },
      { bank: "Controlled Airspace", count: 3 },
      { bank: "Uncontrolled Airspace", count: 1 },
      { bank: "Special Use Airspace", count: 2 }
    ]
  },
  {
    id: "airport-operations",
    title: "Airport Operations",
    totalQuestions: 10,
    questionGroups: [
      { bank: "Types of Airports", count: 2 },
      { bank: "Monitoring ATC Communications", count: 2 },
      { bank: "Runways", count: 2 },
      { bank: "Air Traffic Patterns", count: 2 },
      { bank: "Security Identification Display Areas", count: 1 },
      { bank: "Bird and Wildlife Hazards", count: 1 }
    ]
  },
  {
    id: "sectional-charts-part-2",
    title: "Sectional Charts Part 2",
    totalQuestions: 9,
    questionGroups: [
      { bank: "Obstructions", count: 2 },
      { bank: "Measurements - Distance and Coordinates", count: 2 },
      { bank: "MEF", count: 1 },
      { bank: "VFR Checkpoints", count: 1 },
      { bank: "Victor Airways", count: 1 },
      { bank: "Military Training Routes", count: 1 },
      { bank: "Magnetic Variation", count: 1 }
    ]
  },
  {
    id: "effects-of-weather-part-1",
    title: "Effects of Weather Part 1",
    totalQuestions: 9,
    questionGroups: [
      { bank: "Air Masses and Fronts", count: 2 },
      { bank: "Wind", count: 3 },
      { bank: "Windshear", count: 2 },
      { bank: "Microbursts", count: 2 }
    ]
  },
  {
    id: "loading-and-performance",
    title: "Loading and Performance",
    totalQuestions: 14,
    questionGroups: [
      { bank: "Four Forces", count: 2 },
      { bank: "Lift", count: 2 },
      { bank: "Stalls", count: 2 },
      { bank: "Center of Gravity and Stability", count: 2 },
      { bank: "Weight and Loading", count: 2 },
      { bank: "Load Factor - Part 1", count: 2 },
      { bank: "Load Factor - Part 2", count: 2 }
    ]
  },
  {
    id: "sources-of-weather-information",
    title: "Sources of Weather Information",
    totalQuestions: 8,
    questionGroups: [
      { bank: "Convective SIGMETs", count: 2 },
      { bank: "METARs", count: 2 },
      { bank: "METAR and TAF Glossary", count: 2 },
      { bank: "TAFs", count: 2 }
    ]
  },
  {
    id: "effects-of-weather-part-2",
    title: "Effects of Weather Part 2",
    totalQuestions: 14,
    questionGroups: [
      { bank: "Atmospheric Stability", count: 2 },
      { bank: "Temperature Inversions", count: 2 },
      { bank: "Temperature and Dew Point", count: 2 },
      { bank: "Clouds and Icing", count: 2 },
      { bank: "Thunderstorms", count: 2 },
      { bank: "Density Altitude", count: 2 },
      { bank: "Atmospheric Pressure", count: 2 }
    ]
  },
  {
    id: "aeronautical-decision-making",
    title: "Aeronautical Decision Making",
    totalQuestions: 10,
    questionGroups: [
      { bank: "Aeronautical Decision Making", count: 10 }
    ]
  },
  {
    id: "emergency-procedures",
    title: "Emergency Procedures",
    totalQuestions: 10,
    questionGroups: [
      { bank: "Emergency Procedures", count: 10 }
    ]
  },
  {
    id: "maintenance",
    title: "Maintenance",
    totalQuestions: 10,
    questionGroups: [
      { bank: "Maintenance and Inspection", count: 10 }
    ]
  },
  {
    id: "physiology",
    title: "Physiology",
    totalQuestions: 10,
    questionGroups: [
      { bank: "Physiology", count: 10 }
    ]
  },
  {
    id: "faa-part-107-practice-exam",
    title: "FAA Part 107 Practice Exam",
    totalQuestions: 60,
    questionGroups: [
      { bank: "Aeronautical Decision Making", count: 2 },
      { bank: "Airport Operations", count: 4 },
      { bank: "Airspace", count: 6 },
      { bank: "Effects of Weather", count: 10 },
      { bank: "Emergency Procedures", count: 2 },
      { bank: "Loading and Performance", count: 4 },
      { bank: "Maintenance and Inspection", count: 2 },
      { bank: "Physiology", count: 2 },
      { bank: "Radio Communications", count: 3 },
      { bank: "Reading Sectional Charts", count: 9 },
      { bank: "Regulations", count: 12 },
      { bank: "Sources of Weather Information", count: 4 }
    ]
  }
];
