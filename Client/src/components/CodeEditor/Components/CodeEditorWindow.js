import React, { useEffect, useState } from "react";

import Editor from "@monaco-editor/react";
// Template Sources
var assemblySource =
  "\
section	.text\n\
    global _start\n\
\n\
_start:\n\
\n\
    xor	eax, eax\n\
    lea	edx, [rax+len]\n\
    mov	al, 1\n\
    mov	esi, msg\n\
    mov	edi, eax\n\
    syscall\n\
\n\
    xor	edi, edi\n\
    lea	eax, [rdi+60]\n\
    syscall\n\
\n\
section	.rodata\n\
\n\
msg	db 'hello, world', 0xa\n\
len	equ	$ - msg\n\
";

var bashSource = 'echo "hello, world"';

var basicSource = 'PRINT "hello, world"';

var cSource =
  '\
// Powered by Judge0\n\
#include <stdio.h>\n\
\n\
int main(void) {\n\
    printf("Hello Judge0!\\n");\n\
    return 0;\n\
}\n\
';

var csharpSource =
  '\
public class Hello {\n\
    public static void Main() {\n\
        System.Console.WriteLine("hello, world");\n\
    }\n\
}\n\
';

var cppSource =
  '\
#include <iostream>\n\
\n\
int main() {\n\
    std::cout << "hello, world" << std::endl;\n\
    return 0;\n\
}\n\
';

var competitiveProgrammingSource =
  "\
#include <algorithm>\n\
#include <cstdint>\n\
#include <iostream>\n\
#include <limits>\n\
#include <set>\n\
#include <utility>\n\
#include <vector>\n\
\n\
using Vertex    = std::uint16_t;\n\
using Cost      = std::uint16_t;\n\
using Edge      = std::pair< Vertex, Cost >;\n\
using Graph     = std::vector< std::vector< Edge > >;\n\
using CostTable = std::vector< std::uint64_t >;\n\
\n\
constexpr auto kInfiniteCost{ std::numeric_limits< CostTable::value_type >::max() };\n\
\n\
auto dijkstra( Vertex const start, Vertex const end, Graph const & graph, CostTable & costTable )\n\
{\n\
    std::fill( costTable.begin(), costTable.end(), kInfiniteCost );\n\
    costTable[ start ] = 0;\n\
\n\
    std::set< std::pair< CostTable::value_type, Vertex > > minHeap;\n\
    minHeap.emplace( 0, start );\n\
\n\
    while ( !minHeap.empty() )\n\
    {\n\
        auto const vertexCost{ minHeap.begin()->first  };\n\
        auto const vertex    { minHeap.begin()->second };\n\
\n\
        minHeap.erase( minHeap.begin() );\n\
\n\
        if ( vertex == end )\n\
        {\n\
            break;\n\
        }\n\
\n\
        for ( auto const & neighbourEdge : graph[ vertex ] )\n\
        {\n\
            auto const & neighbour{ neighbourEdge.first };\n\
            auto const & cost{ neighbourEdge.second };\n\
\n\
            if ( costTable[ neighbour ] > vertexCost + cost )\n\
            {\n\
                minHeap.erase( { costTable[ neighbour ], neighbour } );\n\
                costTable[ neighbour ] = vertexCost + cost;\n\
                minHeap.emplace( costTable[ neighbour ], neighbour );\n\
            }\n\
        }\n\
    }\n\
\n\
    return costTable[ end ];\n\
}\n\
\n\
int main()\n\
{\n\
    constexpr std::uint16_t maxVertices{ 10000 };\n\
\n\
    Graph     graph    ( maxVertices );\n\
    CostTable costTable( maxVertices );\n\
\n\
    std::uint16_t testCases;\n\
    std::cin >> testCases;\n\
\n\
    while ( testCases-- > 0 )\n\
    {\n\
        for ( auto i{ 0 }; i < maxVertices; ++i )\n\
        {\n\
            graph[ i ].clear();\n\
        }\n\
\n\
        std::uint16_t numberOfVertices;\n\
        std::uint16_t numberOfEdges;\n\
\n\
        std::cin >> numberOfVertices >> numberOfEdges;\n\
\n\
        for ( auto i{ 0 }; i < numberOfEdges; ++i )\n\
        {\n\
            Vertex from;\n\
            Vertex to;\n\
            Cost   cost;\n\
\n\
            std::cin >> from >> to >> cost;\n\
            graph[ from ].emplace_back( to, cost );\n\
        }\n\
\n\
        Vertex start;\n\
        Vertex end;\n\
\n\
        std::cin >> start >> end;\n\
\n\
        auto const result{ dijkstra( start, end, graph, costTable ) };\n\
\n\
        if ( result == kInfiniteCost )\n\
        {\n\
            std::cout << \"NO\\n\";\n\
        }\n\
        else\n\
        {\n\
            std::cout << result << '\\n';\n\
        }\n\
    }\n\
\n\
    return 0;\n\
}\n\
";

var clojureSource = '(println "hello, world")\n';

var cobolSource =
  '\
IDENTIFICATION DIVISION.\n\
PROGRAM-ID. MAIN.\n\
PROCEDURE DIVISION.\n\
DISPLAY "hello, world".\n\
STOP RUN.\n\
';

var lispSource = '(write-line "hello, world")';

var dSource =
  '\
import std.stdio;\n\
\n\
void main()\n\
{\n\
    writeln("hello, world");\n\
}\n\
';

var elixirSource = 'IO.puts "hello, world"';

var erlangSource =
  '\
main(_) ->\n\
    io:fwrite("hello, world\\n").\n\
';

var executableSource =
  '\
Judge0 IDE assumes that content of executable is Base64 encoded.\n\
\n\
This means that you should Base64 encode content of your binary,\n\
paste it here and click "Run".\n\
\n\
Here is an example of compiled "hello, world" NASM program.\n\
Content of compiled binary is Base64 encoded and used as source code.\n\
\n\
https://ide.judge0.com/?kS_f\n\
';

var fsharpSource = 'printfn "hello, world"\n';

var fortranSource =
  '\
program main\n\
    print *, "hello, world"\n\
end\n\
';

var goSource =
  '\
package main\n\
\n\
import "fmt"\n\
\n\
func main() {\n\
    fmt.Println("hello, world")\n\
}\n\
';

var groovySource = 'println "hello, world"\n';

var haskellSource = 'main = putStrLn "hello, world"';

var javaSource =
  '\
public class Main {\n\
    public static void main(String[] args) {\n\
        System.out.println("hello, world");\n\
    }\n\
}\n\
';

var javaScriptSource = 'console.log("hello, world");';

var kotlinSource =
  '\
fun main() {\n\
    println("hello, world")\n\
}\n\
';

var luaSource = 'print("hello, world")';

var objectiveCSource =
  '\
#import <Foundation/Foundation.h>\n\
\n\
int main() {\n\
    @autoreleasepool {\n\
        char name[10];\n\
        scanf("%s", name);\n\
        NSString *message = [NSString stringWithFormat:@"hello, %s\\n", name];\n\
        printf("%s", message.UTF8String);\n\
    }\n\
    return 0;\n\
}\n\
';

var ocamlSource = 'print_endline "hello, world"';

var octaveSource = 'printf("hello, world\\n");';

var pascalSource =
  "\
program Hello;\n\
begin\n\
    writeln ('hello, world')\n\
end.\n\
";

var perlSource =
  '\
my $name = <STDIN>;\n\
print "hello, $name";\n\
';

var phpSource =
  '\
<?php\n\
print("hello, world\\n");\n\
?>\n\
';

var plainTextSource = "hello, world\n";

var prologSource =
  "\
:- initialization(main).\n\
main :- write('hello, world\\n').\n\
";

var pythonSource = 'print("hello, world")';

var rSource = 'cat("hello, world\\n")';

var rubySource = 'puts "hello, world"';

var rustSource =
  '\
fn main() {\n\
    println!("hello, world");\n\
}\n\
';

var scalaSource =
  '\
object Main {\n\
    def main(args: Array[String]) = {\n\
        val name = scala.io.StdIn.readLine()\n\
        println("hello, "+ name)\n\
    }\n\
}\n\
';

var sqliteSource =
  "\
-- On Judge0 IDE your SQL script is run on chinook database (https://www.sqlitetutorial.net/sqlite-sample-database).\n\
-- For more information about how to use SQL with Judge0 please\n\
-- watch this asciicast: https://asciinema.org/a/326975.\n\
SELECT\n\
    Name, COUNT(*) AS num_albums\n\
FROM artists JOIN albums\n\
ON albums.ArtistID = artists.ArtistID\n\
GROUP BY Name\n\
ORDER BY num_albums DESC\n\
LIMIT 4;\n\
";
var sqliteAdditionalFiles = "";

var swiftSource =
  '\
import Foundation\n\
let name = readLine()\n\
print("hello, \\(name!)")\n\
';

var typescriptSource = 'console.log("hello, world");';

var vbSource =
  '\
Public Module Program\n\
   Public Sub Main()\n\
      Console.WriteLine("hello, world")\n\
   End Sub\n\
End Module\n\
';

var c3Source =
  '\
// On the Judge0 IDE, C3 is automatically\n\
// updated every hour to the latest commit on master branch.\n\
module main;\n\
\n\
extern func void printf(char *str, ...);\n\
\n\
func int main()\n\
{\n\
    printf("hello, world\\n");\n\
    return 0;\n\
}\n\
';

var javaTestSource =
  "\
import static org.junit.jupiter.api.Assertions.assertEquals;\n\
\n\
import org.junit.jupiter.api.Test;\n\
\n\
class MainTest {\n\
    static class Calculator {\n\
        public int add(int x, int y) {\n\
            return x + y;\n\
        }\n\
    }\n\
\n\
    private final Calculator calculator = new Calculator();\n\
\n\
    @Test\n\
    void addition() {\n\
        assertEquals(2, calculator.add(1, 1));\n\
    }\n\
}\n\
";

var mpiccSource =
  '\
// Try adding "-n 5" (without quotes) into command line arguments. \n\
#include <mpi.h>\n\
\n\
#include <stdio.h>\n\
\n\
int main()\n\
{\n\
    MPI_Init(NULL, NULL);\n\
\n\
    int world_size;\n\
    MPI_Comm_size(MPI_COMM_WORLD, &world_size);\n\
\n\
    int world_rank;\n\
    MPI_Comm_rank(MPI_COMM_WORLD, &world_rank);\n\
\n\
    printf("Hello from processor with rank %d out of %d processors.\\n", world_rank, world_size);\n\
\n\
    MPI_Finalize();\n\
\n\
    return 0;\n\
}\n\
';

var mpicxxSource =
  '\
// Try adding "-n 5" (without quotes) into command line arguments. \n\
#include <mpi.h>\n\
\n\
#include <iostream>\n\
\n\
int main()\n\
{\n\
    MPI_Init(NULL, NULL);\n\
\n\
    int world_size;\n\
    MPI_Comm_size(MPI_COMM_WORLD, &world_size);\n\
\n\
    int world_rank;\n\
    MPI_Comm_rank(MPI_COMM_WORLD, &world_rank);\n\
\n\
    std::cout << "Hello from processor with rank "\n\
              << world_rank << " out of " << world_size << " processors.\\n";\n\
\n\
    MPI_Finalize();\n\
\n\
    return 0;\n\
}\n\
';

var mpipySource =
  '\
# Try adding "-n 5" (without quotes) into command line arguments. \n\
from mpi4py import MPI\n\
\n\
comm = MPI.COMM_WORLD\n\
world_size = comm.Get_size()\n\
world_rank = comm.Get_rank()\n\
\n\
print(f"Hello from processor with rank {world_rank} out of {world_size} processors")\n\
';

var nimSource =
  '\
# On the Judge0 IDE, Nim is automatically\n\
# updated every day to the latest stable version.\n\
echo "hello, world"\n\
';

var pythonForMlSource =
  '\
import mlxtend\n\
import numpy\n\
import pandas\n\
import scipy\n\
import sklearn\n\
\n\
print("hello, world")\n\
';

var bosqueSource =
  '\
// On the Judge0 IDE, Bosque (https://github.com/microsoft/BosqueLanguage)\n\
// is automatically updated every hour to the latest commit on master branch.\n\
\n\
namespace NSMain;\n\
\n\
concept WithName {\n\
    invariant $name != "";\n\
\n\
    field name: String;\n\
}\n\
\n\
concept Greeting {\n\
    abstract method sayHello(): String;\n\
    \n\
    virtual method sayGoodbye(): String {\n\
        return "goodbye";\n\
    }\n\
}\n\
\n\
entity GenericGreeting provides Greeting {\n\
    const instance: GenericGreeting = GenericGreeting@{};\n\
\n\
    override method sayHello(): String {\n\
        return "hello world";\n\
    }\n\
}\n\
\n\
entity NamedGreeting provides WithName, Greeting {\n\
    override method sayHello(): String {\n\
        return String::concat("hello", " ", this.name);\n\
    }\n\
}\n\
\n\
entrypoint function main(arg?: String): String {\n\
    var val = arg ?| "";\n\
    if (val == "1") {\n\
        return GenericGreeting@{}.sayHello();\n\
    }\n\
    elif (val == "2") {\n\
        return GenericGreeting::instance.sayHello();\n\
    }\n\
    else {\n\
        return NamedGreeting@{name="bob"}.sayHello();\n\
    }\n\
}\n\
';

var cppTestSource =
  "\
#include <gtest/gtest.h>\n\
\n\
int add(int x, int y) {\n\
    return x + y;\n\
}\n\
\n\
TEST(AdditionTest, NeutralElement) {\n\
    EXPECT_EQ(1, add(1, 0));\n\
    EXPECT_EQ(1, add(0, 1));\n\
    EXPECT_EQ(0, add(0, 0));\n\
}\n\
\n\
TEST(AdditionTest, CommutativeProperty) {\n\
    EXPECT_EQ(add(2, 3), add(3, 2));\n\
}\n\
\n\
int main(int argc, char **argv) {\n\
    ::testing::InitGoogleTest(&argc, argv);\n\
    return RUN_ALL_TESTS();\n\
}\n\
";

var csharpTestSource =
  "\
using NUnit.Framework;\n\
\n\
public class Calculator\n\
{\n\
    public int add(int a, int b)\n\
    {\n\
        return a + b;\n\
    }\n\
}\n\
\n\
[TestFixture]\n\
public class Tests\n\
{\n\
    private Calculator calculator;\n\
\n\
    [SetUp]\n\
    protected void SetUp()\n\
    {\n\
        calculator = new Calculator();\n\
    }\n\
\n\
    [Test]\n\
    public void NeutralElement()\n\
    {\n\
        Assert.AreEqual(1, calculator.add(1, 0));\n\
        Assert.AreEqual(1, calculator.add(0, 1));\n\
        Assert.AreEqual(0, calculator.add(0, 0));\n\
    }\n\
\n\
    [Test]\n\
    public void CommutativeProperty()\n\
    {\n\
        Assert.AreEqual(calculator.add(2, 3), calculator.add(3, 2));\n\
    }\n\
}\n\
";

var sources = {
  45: assemblySource,
  46: bashSource,
  47: basicSource,
  48: cSource,
  49: cSource,
  50: cSource,
  51: csharpSource,
  52: cppSource,
  53: cppSource,
  54: competitiveProgrammingSource,
  55: lispSource,
  56: dSource,
  57: elixirSource,
  58: erlangSource,
  44: executableSource,
  59: fortranSource,
  60: goSource,
  61: haskellSource,
  62: javaSource,
  63: javaScriptSource,
  64: luaSource,
  65: ocamlSource,
  66: octaveSource,
  67: pascalSource,
  68: phpSource,
  43: plainTextSource,
  69: prologSource,
  70: pythonSource,
  71: pythonSource,
  72: rubySource,
  73: rustSource,
  74: typescriptSource,
  75: cSource,
  76: cppSource,
  77: cobolSource,
  78: kotlinSource,
  79: objectiveCSource,
  80: rSource,
  81: scalaSource,
  82: sqliteSource,
  83: swiftSource,
  84: vbSource,
  85: perlSource,
  86: clojureSource,
  87: fsharpSource,
  88: groovySource,
  1001: cSource,
  1002: cppSource,
  1003: c3Source,
  1004: javaSource,
  1005: javaTestSource,
  1006: mpiccSource,
  1007: mpicxxSource,
  1008: mpipySource,
  1009: nimSource,
  1010: pythonForMlSource,
  1011: bosqueSource,
  1012: cppTestSource,
  1013: cSource,
  1014: cppSource,
  1015: cppTestSource,
  1021: csharpSource,
  1022: csharpSource,
  1023: csharpTestSource,
  1024: fsharpSource,
};

var fileNames = {
  45: "main.asm",
  46: "script.sh",
  47: "main.bas",
  48: "main.c",
  49: "main.c",
  50: "main.c",
  51: "Main.cs",
  52: "main.cpp",
  53: "main.cpp",
  54: "main.cpp",
  55: "script.lisp",
  56: "main.d",
  57: "script.exs",
  58: "main.erl",
  44: "a.out",
  59: "main.f90",
  60: "main.go",
  61: "main.hs",
  62: "Main.java",
  63: "script.js",
  64: "script.lua",
  65: "main.ml",
  66: "script.m",
  67: "main.pas",
  68: "script.php",
  43: "text.txt",
  69: "main.pro",
  70: "script.py",
  71: "script.py",
  72: "script.rb",
  73: "main.rs",
  74: "script.ts",
  75: "main.c",
  76: "main.cpp",
  77: "main.cob",
  78: "Main.kt",
  79: "main.m",
  80: "script.r",
  81: "Main.scala",
  82: "script.sql",
  83: "Main.swift",
  84: "Main.vb",
  85: "script.pl",
  86: "main.clj",
  87: "script.fsx",
  88: "script.groovy",
  1001: "main.c",
  1002: "main.cpp",
  1003: "main.c3",
  1004: "Main.java",
  1005: "MainTest.java",
  1006: "main.c",
  1007: "main.cpp",
  1008: "script.py",
  1009: "main.nim",
  1010: "script.py",
  1011: "main.bsq",
  1012: "main.cpp",
  1013: "main.c",
  1014: "main.cpp",
  1015: "main.cpp",
  1021: "Main.cs",
  1022: "Main.cs",
  1023: "Test.cs",
  1024: "script.fsx",
};

var languageIdTable = {
  1001: 1,
  1002: 2,
  1003: 3,
  1004: 4,
  1005: 5,
  1006: 6,
  1007: 7,
  1008: 8,
  1009: 9,
  1010: 10,
  1011: 11,
  1012: 12,
  1013: 13,
  1014: 14,
  1015: 15,
  1021: 21,
  1022: 22,
  1023: 23,
  1024: 24,
};

var competitiveProgrammingInput =
  "\
3\n\
3 2\n\
1 2 5\n\
2 3 7\n\
1 3\n\
3 3\n\
1 2 4\n\
1 3 7\n\
2 3 1\n\
1 3\n\
3 1\n\
1 2 4\n\
1 3\n\
";

var inputs = {
  54: competitiveProgrammingInput,
};

var competitiveProgrammingCompilerOptions =
  "-O3 --std=c++17 -Wall -Wextra -Wold-style-cast -Wuseless-cast -Wnull-dereference -Werror -Wfatal-errors -pedantic -pedantic-errors";

var compilerOptions = {
  54: competitiveProgrammingCompilerOptions,
};
const CodeEditorWindow = ({ onChange, language, code, theme }) => {
  const [value, setValue] = useState(code || "");

  useEffect(() => {
    switch (language) {
      case "cpp":
        setValue(cppSource);
        break;
      case "c":
        setValue(cSource);
        break;
      case "javascript":
        setValue(javaScriptSource);
        break;
      case "assembly":
        setValue(assemblySource);
        break;
      case "bash":
        setValue(bashSource);
        break;
      case "basic":
        setValue(basicSource);
        break;
      case "clojure":
        setValue(clojureSource);
        break;
      case "csharp":
        setValue(csharpSource);
        break;
      case "cobol":
        setValue(cobolSource);
        break;
      case "lisp":
        setValue(lispSource);
        break;
      case "d":
        setValue(dSource);
        break;
      case "elixir":
        setValue(elixirSource);
        break;
      case "erlang":
        setValue(erlangSource);
        break;
      case "exe":
        setValue(executableSource);
        break;
      case "fsharp":
        setValue(fsharpSource);
        break;
      case "fortran":
        setValue(fortranSource);
        break;
      case "go":
        setValue(goSource);
        break;
      case "groovy":
        setValue(groovySource);
        break;
      case "haskell":
        setValue(haskellSource);
        break;
      case "java":
        setValue(javaSource);
        break;
      case "kotlin":
        setValue(kotlinSource);
        break;
      case "lua":
        setValue(luaSource);
        break;
      case "ocaml":
        setValue(ocamlSource);
        break;
      case "objectivec":
        setValue(objectiveCSource);
        break;
      case "octave":
        setValue(octaveSource);
        break;
      case "pascal":
        setValue(pascalSource);
        break;
      case "perl":
        setValue(perlSource);
        break;
      case "php":
        setValue(phpSource);
        break;
      case "python":
        setValue(pythonSource);
        break;
      case "text":
        setValue(plainTextSource);
        break;
      case "prolog":
        setValue(prologSource);
        break;
      case "r":
        setValue(rSource);
        break;
      case "ruby":
        setValue(rubySource);
        break;
      case "rust":
        setValue(rustSource);
        break;
      case "scala":
        setValue(scalaSource);
        break;
      case "sql":
        setValue(sqliteSource);
        break;
      case "swift":
        setValue(swiftSource);
        break;
      case "typescript":
        setValue(typescriptSource);
        break;
      case "vbnet":
        setValue(vbSource);
        break;
      default:
        setValue("");
    }
  }, [language]);
  const handleEditorChange = (value) => {
    setValue(value);
    onChange("code", value);
  };

  return (
    <div className="overlay rounded-md overflow-hidden w-full h-[500px] shadow-4xl">
      <Editor
        height="85vh"
        width={`100%`}
        language={language || "javascript"}
        value={value}
        theme={theme}
        defaultValue="//code here"
        onChange={handleEditorChange}
      />
    </div>
  );
};
export default CodeEditorWindow;