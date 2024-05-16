// cd C:\Users\L.E\Desktop\Node.js\jour4

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// URL de connexion à MongoDB
const url =
  'mongodb+srv://magex:6nJ00L8P4EIgKlyi@local.srkog23.mongodb.net/?retryWrites=true&w=majority&appName=Local';

// Schéma pour la collection "student"
const studentSchema = new mongoose.Schema({
  id: Number,
  lastname: { type: String, required: true },
  firstname: { type: String, required: true },
  students_number: { type: String, unique: true },
  year_id: Number,
});

// Schéma pour la collection "year"
const yearSchema = new mongoose.Schema({
  year_id: Number,
  year: {
    type: String,
    enum: ['Bachelor 1', 'Bachelor 2', 'Bachelor 3'],
    required: true,
  },
});

// Ajouter le plugin uniqueValidator au schéma Student pour valider les champs uniques
studentSchema.plugin(uniqueValidator);

const Student = mongoose.model('Student', studentSchema);
const Year = mongoose.model('Year', yearSchema);

// Fonction pour se connecter à MongoDB et appeler les fonctions de chaque job
async function main() {
  try {
    // Connexion à MongoDB
    await mongoose.connect(url);
    console.log('Connecté à MongoDB');

    // Jobs 3 et 4 : Définition des schémas pour les étudiants et les années
    console.log('Définition des schémas...');
    await defineStudentSchema();
    await defineYearSchema();

    // Job 5 : Récupération de tous les étudiants avec leurs cursus
    console.log('Récupération des étudiants avec leurs cursus...');
    await getStudentsWithYear();

    // Job 6 : Filtrage des étudiants avec un numéro d'étudiant plus grand que celui saisi par l'utilisateur
    console.log('Filtrage des étudiants...');
    await filterStudentsByStudentNumber('1234'); // Exemple de numéro d'étudiant pour le filtrage

    // Job 7 : Récupération des informations d'un étudiant à partir de son nom de famille
    console.log("Récupération des informations d'un étudiant...");
    await getStudentByLastName('Dupont'); // Exemple de nom de famille pour la récupération d'informations

    // Job 8 : Mise à jour du cursus d'un étudiant en fonction de son ID
    console.log("Mise à jour du cursus d'un étudiant...");
    await updateStudentCursusById(1, 2); // Exemple d'ID d'étudiant et de nouvel ID de cursus pour la mise à jour

    // Job 9 : Suppression d'un étudiant de la base de données en fonction de son ID
    console.log("Suppression d'un étudiant...");
    await deleteStudentById(1); // Exemple d'ID d'étudiant pour la suppression

    // Job 11 : Exportation des données de la collection dans un fichier JSON
    console.log('Exportation des données vers JSON...');
    await exportDataToJson();

    console.log('Tous les jobs ont été exécutés avec succès!');
  } catch (error) {
    console.error('Une erreur est survenue :', error);
  } finally {
    // Déconnexion de MongoDB à la fin de l'exécution
    mongoose.disconnect();
    console.log('Déconnecté de MongoDB');
  }
}

// Fonction pour se connecter à MongoDB
async function connectToMongoDB() {
  try {
    await mongoose.connect(url);
    console.log('Connecté à MongoDB');
  } catch (error) {
    console.error('Erreur lors de la connexion à MongoDB :', error);
  }
}

// Job 3: Définition du schéma pour les étudiants
async function defineStudentSchema() {
  const Student = mongoose.model('Student', studentSchema);
  console.log('Schéma pour les étudiants défini avec succès');
}

// Job 4: Définition du schéma pour les années
async function defineYearSchema() {
  const Year = mongoose.model('Year', yearSchema);
  console.log('Schéma pour les années défini avec succès');
}

// Job 5: Récupération de tous les étudiants avec leurs cursus
async function getStudentsWithYear() {
  const studentsWithYear = await Student.aggregate([
    {
      $lookup: {
        from: 'years',
        localField: 'year_id',
        foreignField: 'year_id',
        as: 'year_info',
      },
    },
    {
      $project: {
        _id: 0,
        id: 1,
        lastname: 1,
        firstname: 1,
        students_number: 1,
        year: { $arrayElemAt: ['$year_info.year', 0] },
      },
    },
  ]);
  console.log('Étudiants de la Plateforme avec leur cursus :');
  console.log(studentsWithYear);
}

// Job 6: Filtrage des étudiants avec un numéro d'étudiant plus grand que celui saisi par l'utilisateur
async function filterStudentsByStudentNumber(studentNumber) {
  const filteredStudents = await Student.find({
    students_number: { $gt: studentNumber },
  });
  console.log(
    "Étudiants avec un numéro d'étudiant plus grand que",
    studentNumber,
    ':'
  );
  console.log(filteredStudents);
}

// Job 7: Récupération des informations d'un étudiant à partir de son nom de famille
async function getStudentByLastName(lastName) {
  const student = await Student.findOne({ lastname: lastName });
  if (student) {
    console.log(
      "Informations de l'étudiant avec le nom de famille",
      lastName,
      ':'
    );
    console.log(student);
  } else {
    console.log('Aucun étudiant trouvé avec le nom de famille', lastName);
  }
}

// Job 8: Mise à jour du cursus d'un étudiant en fonction de son ID
async function updateStudentCursusById(studentId, newYearId) {
  const updatedStudent = await Student.findByIdAndUpdate(
    new mongoose.Types.ObjectId(studentId), // Utiliser new pour créer un nouvel ObjectId
    { year_id: newYearId },
    { new: true }
  );
  if (updatedStudent) {
    console.log(
      "Cursus de l'étudiant avec l'ID",
      studentId,
      'mis à jour avec succès :'
    );
    console.log(updatedStudent);
  } else {
    console.log("Aucun étudiant trouvé avec l'ID", studentId);
  }
}

// Job 9: Suppression d'un étudiant de la base de données en fonction de son ID
async function deleteStudentById(studentId) {
  const deletedStudent = await Student.findByIdAndDelete(
    new mongoose.Types.ObjectId(studentId) // Convertir studentId en ObjectId
  );
  if (deletedStudent) {
    console.log("Étudiant avec l'ID", studentId, 'supprimé avec succès :');
    console.log(deletedStudent);
  } else {
    console.log("Aucun étudiant trouvé avec l'ID", studentId);
  }
}

// Job 11: Exportation des données de la collection dans un fichier JSON
async function exportDataToJson() {
  const students = await Student.find();
  const years = await Year.find();
  const data = { students, years };
  const jsonData = JSON.stringify(data, null, 2);
  const fs = require('fs');
  fs.writeFileSync('data.json', jsonData);
  console.log('Données exportées avec succès dans le fichier data.json');
}
// Fonction pour insérer des données d'exemple dans la base de données
async function seed() {
  try {
    // Compter le nombre d'étudiants actuels dans la base de données avec un délai d'attente de 10 secondes
    const studentCount = await Student.countDocuments().maxTimeMS(10000);

    // Si le nombre d'étudiants est inférieur à 2, alors ajouter des données d'exemple
    if (studentCount < 2) {
      // Supprimer toutes les données existantes pour éviter les doublons
      await Student.deleteMany();
      await Year.deleteMany();

      // Créer des années d'exemple
      const bachelor1 = new Year({ year_id: 1, year: 'Bachelor 1' });
      const bachelor2 = new Year({ year_id: 2, year: 'Bachelor 2' });
      const bachelor3 = new Year({ year_id: 3, year: 'Bachelor 3' });
      await bachelor1.save();
      await bachelor2.save();
      await bachelor3.save();

      // Créer des étudiants d'exemple
      const student1 = new Student({
        id: 1,
        lastname: 'Dupont',
        firstname: 'Jean',
        students_number: '1234',
        year_id: 1,
      });
      const student2 = new Student({
        id: 2,
        lastname: 'Durand',
        firstname: 'Pierre',
        students_number: '2345',
        year_id: 2,
      });
      await student1.save();
      await student2.save();

      console.log("Données d'exemple insérées avec succès");
    } else {
      console.log(
        "Il y a déjà suffisamment d'étudiants dans la base de données. Aucune donnée d'exemple ajoutée."
      );
    }
  } catch (error) {
    // Gérer l'erreur de délai d'attente et autres erreurs
    console.error(
      'Une erreur est survenue lors de la tentative de comptage des étudiants :',
      error
    );
  }
}

// Appeler la fonction pour insérer des données d'exemple et exécuter tous les jobs
main();
