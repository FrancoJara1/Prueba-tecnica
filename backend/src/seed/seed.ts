import "dotenv/config";
import { db } from "../database/mongodb";
import { auth } from "../config/auth";
import { ObjectId } from "mongodb";

const users = [
  {
    name: "Juan Pérez",
    email: "juan.seed@example.com",
    password: "Password123!",
  },
  {
    name: "María González",
    email: "maria.seed@example.com",
    password: "Password123!",
  },
];

const articles = [
  {
    title: "Introducción a React",
    content:
      "React es una biblioteca de JavaScript utilizada para construir interfaces de usuario modernas y dinámicas. Su principal característica es el uso de componentes reutilizables, que permiten dividir una aplicación en partes pequeñas y fáciles de mantener.\n\nAdemás, React utiliza un sistema de renderizado eficiente que permite actualizar solamente las partes de la interfaz que necesitan cambiar. Esto facilita la creación de aplicaciones interactivas y escalables.",
    imageUrl:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
  },
  {
    title: "¿Qué es TypeScript?",
    content:
      "TypeScript es un lenguaje basado en JavaScript que incorpora tipado estático. Esto permite detectar muchos errores durante el desarrollo antes de ejecutar la aplicación.\n\nUna de sus principales ventajas es que facilita el mantenimiento de proyectos grandes, ya que los tipos ayudan a comprender qué información espera cada función, componente u objeto.\n\nPor este motivo, TypeScript es muy utilizado actualmente en aplicaciones frontend y backend.",
    imageUrl:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea",
  },
  {
    title: "Guía básica de MongoDB",
    content:
      "MongoDB es una base de datos NoSQL orientada a documentos. A diferencia de las bases de datos relacionales tradicionales, almacena la información utilizando documentos similares a objetos JSON.\n\nEsta estructura permite trabajar con datos flexibles y resulta especialmente útil para aplicaciones donde el modelo puede evolucionar con el tiempo.\n\nMongoDB también ofrece herramientas para realizar búsquedas, filtros, ordenamientos y agregaciones sobre grandes cantidades de información.",
    imageUrl:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31",
  },
  {
    title: "Introducción a Hono",
    content:
      "Hono es un framework web rápido y liviano diseñado principalmente para construir aplicaciones y APIs utilizando JavaScript o TypeScript.\n\nSu API sencilla permite crear rutas, middlewares y controladores sin necesidad de utilizar una estructura demasiado compleja.\n\nUna de sus principales ventajas es su bajo consumo de recursos y su facilidad para trabajar con diferentes runtimes.",
    imageUrl: null,
  },
  {
    title: "¿Qué es TanStack Query?",
    content:
      "TanStack Query es una herramienta que permite gestionar de manera eficiente los datos provenientes de un servidor en aplicaciones frontend.\n\nSe encarga de tareas como cachear respuestas, controlar estados de carga y error, volver a realizar peticiones y mantener los datos sincronizados.\n\nEsto evita tener que implementar manualmente gran parte de la lógica necesaria para trabajar con APIs.",
    imageUrl:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
  },
  {
    title: "Mejores prácticas en APIs REST",
    content:
      "Una API REST debe utilizar correctamente los métodos HTTP para representar las diferentes operaciones disponibles. Por ejemplo, GET se utiliza para obtener información, POST para crear recursos, PUT o PATCH para actualizarlos y DELETE para eliminarlos.\n\nTambién es importante utilizar códigos de estado HTTP apropiados y devolver respuestas consistentes.\n\nUna API bien diseñada facilita el trabajo del frontend y permite que otros clientes puedan consumir los mismos servicios.",
    imageUrl: null,
  },
  {
    title: "Autenticación con Better Auth",
    content:
      "Better Auth es una biblioteca que facilita la implementación de sistemas de autenticación en aplicaciones modernas.\n\nPermite gestionar usuarios, sesiones y diferentes métodos de autenticación sin tener que implementar manualmente toda la lógica de seguridad.\n\nEn una aplicación Full Stack resulta especialmente útil para proteger rutas y controlar qué recursos puede utilizar cada usuario.",
    imageUrl:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3",
  },
  {
    title: "Validación con Zod",
    content:
      "Zod es una biblioteca utilizada para validar datos mediante esquemas. Permite definir de forma clara qué estructura deben tener los datos recibidos por una aplicación.\n\nEs especialmente útil en APIs porque permite validar la información enviada por los clientes antes de procesarla o almacenarla en la base de datos.\n\nAdemás, funciona muy bien con TypeScript porque permite inferir tipos a partir de los esquemas definidos.",
    imageUrl: null,
  },
  {
    title: "React Router y navegación",
    content:
      "Los routers permiten gestionar diferentes páginas y rutas dentro de una aplicación React. Esto hace posible construir aplicaciones con múltiples vistas sin tener que recargar completamente la página.\n\nTanStack Router ofrece herramientas para definir rutas, parámetros, búsqueda y navegación de manera tipada.\n\nTambién permite proteger determinadas rutas y controlar qué contenido puede visualizar cada usuario.",
    imageUrl:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3",
  },
  {
    title: "Introducción a Node.js",
    content:
      "Node.js permite ejecutar JavaScript en el servidor utilizando el motor V8 de Google Chrome. Gracias a esto, es posible utilizar JavaScript tanto en el frontend como en el backend.\n\nSu arquitectura basada en eventos y operaciones asíncronas lo hace especialmente útil para construir APIs y aplicaciones que necesitan manejar muchas conexiones simultáneas.\n\nAdemás, cuenta con un ecosistema muy amplio de paquetes disponibles mediante npm.",
    imageUrl: null,
  },
  {
    title: "¿Qué es una API?",
    content:
      "Una API es una interfaz que permite que diferentes aplicaciones o servicios puedan comunicarse entre sí. En una aplicación web, normalmente el frontend utiliza una API para solicitar o enviar información al backend.\n\nLas APIs pueden utilizar diferentes protocolos y formatos de datos. Actualmente, REST utilizando HTTP y JSON es una de las alternativas más utilizadas.\n\nDiseñar correctamente una API es fundamental para mantener separadas las responsabilidades entre frontend y backend.",
    imageUrl: null,
  },
  {
    title: "Paginación en MongoDB",
    content:
      "La paginación permite dividir grandes cantidades de resultados en diferentes páginas. Esto evita enviar todos los documentos de una colección en una sola respuesta y mejora el rendimiento de la aplicación.\n\nUna estrategia común consiste en utilizar los parámetros page y limit para determinar qué cantidad de documentos mostrar y desde qué posición comenzar.\n\nTambién es importante devolver información adicional como el total de resultados y la cantidad total de páginas.",
    imageUrl: null,
  },
  {
    title: "Búsqueda de artículos",
    content:
      "Una funcionalidad de búsqueda permite que los usuarios encuentren rápidamente artículos relacionados con una determinada palabra o frase.\n\nEn MongoDB es posible utilizar expresiones regulares para buscar coincidencias dentro de diferentes campos, como el título y el contenido.\n\nPara mejorar la experiencia de usuario, la búsqueda debería combinarse con estados de carga, mensajes cuando no existen resultados y paginación.",
    imageUrl: null,
  },
  {
    title: "Ordenamiento de resultados",
    content:
      "El ordenamiento permite presentar los artículos de acuerdo con diferentes criterios. Por ejemplo, pueden mostrarse primero los artículos más recientes o aquellos cuyo título aparece primero alfabéticamente.\n\nUna API puede recibir parámetros como sortBy y order para determinar qué campo utilizar y en qué dirección ordenar los resultados.\n\nEs importante validar los campos permitidos para evitar que el cliente pueda solicitar criterios de ordenamiento inesperados.",
    imageUrl: null,
  },
  {
    title: "Arquitectura de una aplicación Full Stack",
    content:
      "Una aplicación Full Stack normalmente está compuesta por diferentes capas que trabajan en conjunto. El frontend se encarga de la interfaz y la interacción con el usuario, mientras que el backend gestiona la lógica de negocio y expone una API.\n\nLa base de datos se encarga de almacenar la información de manera persistente. Separar correctamente estas responsabilidades permite que cada parte del sistema pueda evolucionar de manera independiente.\n\nUna buena arquitectura también facilita las pruebas, el mantenimiento y la incorporación de nuevas funcionalidades.",
    imageUrl: null,
  },
  {
    title: "Buenas prácticas con TypeScript",
    content:
      "Utilizar tipos claros mejora la mantenibilidad y reduce errores en aplicaciones grandes. Una buena práctica consiste en evitar utilizar any cuando existe la posibilidad de definir una estructura concreta.\n\nTambién es recomendable utilizar interfaces o tipos para representar entidades importantes de la aplicación.\n\nEl tipado correcto permite que el editor detecte problemas mientras se escribe el código y facilita la comprensión del proyecto para otros desarrolladores.",
    imageUrl: null,
  },
  {
    title: "MongoDB y ObjectId",
    content:
      "ObjectId es el identificador utilizado habitualmente por MongoDB para sus documentos. Está diseñado para ser único y permite identificar cada registro dentro de una colección.\n\nCuando trabajamos con una API es importante validar que un ID tenga un formato válido antes de intentar convertirlo a ObjectId.\n\nEsto evita errores y permite devolver respuestas apropiadas cuando el cliente proporciona un identificador incorrecto.",
    imageUrl: null,
  },
  {
    title: "Manejo de errores en APIs",
    content:
      "Una API debe devolver mensajes claros y códigos HTTP apropiados cuando ocurre un error. Esto permite que el frontend pueda interpretar correctamente qué ocurrió y mostrar una respuesta adecuada al usuario.\n\nPor ejemplo, un recurso inexistente normalmente debería devolver 404, mientras que una solicitud con datos inválidos puede devolver 400.\n\nTambién es recomendable centralizar el manejo de errores para evitar repetir la misma lógica en todos los controladores.",
    imageUrl: null,
  },
  {
    title: "React Query y mutations",
    content:
      "Las mutations permiten realizar operaciones que modifican información en el servidor, como crear, actualizar o eliminar artículos.\n\nTanStack Query permite controlar estados como pending, success y error, haciendo que sea sencillo mostrar feedback visual durante estas operaciones.\n\nDespués de una mutation también es posible invalidar las queries relacionadas para que la interfaz vuelva a obtener los datos actualizados del servidor.",
    imageUrl: null,
  },
  {
    title: "Diseño de aplicaciones web",
    content:
      "Una buena interfaz debe ser clara, consistente, accesible y fácil de utilizar. Los usuarios deberían poder identificar rápidamente las acciones principales y comprender qué está sucediendo en cada momento.\n\nEl uso consistente de colores, tipografías, espaciados y componentes ayuda a construir una experiencia visual más profesional.\n\nTambién es importante considerar diferentes tamaños de pantalla para que la aplicación pueda utilizarse correctamente desde computadoras, tablets y dispositivos móviles.",
    imageUrl: null,
  },
];

async function createUsers() {
  const userIds: ObjectId[] = [];

  for (const user of users) {
    const existingUser = await db.collection("user").findOne({
      email: user.email,
    });

    if (existingUser) {
      console.log(`⚠️ Usuario ya existe: ${user.email}`);

      userIds.push(existingUser._id as ObjectId);
      continue;
    }

    const response = await auth.api.signUpEmail({
      body: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });

    if (!response?.user?.id) {
      throw new Error(`No se pudo crear el usuario ${user.email}`);
    }

    console.log(`✅ Usuario creado: ${user.email}`);

    userIds.push(new ObjectId(response.user.id));
  }

  return userIds;
}

async function createArticles(userIds: ObjectId[]) {
  const articlesCollection = db.collection("articles");

  const existingSeedArticles = await articlesCollection.countDocuments({
    seed: true,
  });

  if (existingSeedArticles > 0) {
    console.log("⚠️ Los artículos del seed ya existen.");
    return;
  }

  const now = Date.now();

  const documents = articles.map((article, index) => ({
    title: article.title,
    content: article.content,
    imageUrl: article.imageUrl ?? null,

    authorId: userIds[index % userIds.length],

    createdAt: new Date(now - index * 24 * 60 * 60 * 1000),
    updatedAt: new Date(now - index * 24 * 60 * 60 * 1000),

    seed: true,
  }));

  await articlesCollection.insertMany(documents);

  console.log(`✅ ${documents.length} artículos creados`);
}

async function seed() {
  try {
    console.log("🌱 Iniciando seed...");

    await db.command({ ping: 1 });

    console.log("✅ MongoDB conectado");

    const userIds = await createUsers();

    await createArticles(userIds);

    console.log("🎉 Seed completado correctamente");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error ejecutando seed:", error);
    process.exit(1);
  }
}

seed();