import INote from "@/types/notes";

import prisma from "@/lib/prismahelper";

// create new note
export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json()

    if (!body.title) {
      return new Response(
        JSON.stringify({
          message: "Title must be filled",
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const note = await prisma.note.create({
      data: {
          title: body.title,
          content: body.content,          
      },
    });
    return new Response(JSON.stringify(note), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  catch(e) {
    return new Response(
      JSON.stringify({
        message: "Internal Server Error",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

// retrieve note
export async function GET(req: Request, res: Response) {
  try {
    const notes = await prisma.note.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return new Response(JSON.stringify(notes), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  catch(e) {
    return new Response(
      JSON.stringify({
        message: "Internal Server Error",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

// Function to update a note by ID
export async function PUT(req: Request, res: Response) {
  try {
    const body = await req.json()
    const note = await prisma.note.update({
      where: {
        id: body.id,
      },
      data: {
        title: body.title,
        content: body.content
      },
    })
    return new Response(
      JSON.stringify({
        message: "Device deleted: " + body.id,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
  catch {
    return new Response(
      JSON.stringify({
        message: "Internal Server Error",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}


// Function to delete a note by ID
export async function DELETE(req: Request, res: Response) {
  try {
    const body = await req.json()
    const note = await prisma.note.delete({
      where: { id: body.id}
    });
    return new Response(
      JSON.stringify({
        message: "Device deleted: " + body.id,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
  catch {
    return new Response(
      JSON.stringify({
        message: "Internal Server Error",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}