document.addEventListener('DOMContentLoaded', () => {
    const optionSelect = document.getElementById('option-select');
    const inputContent = document.getElementById('input-content');
    const outputContent = document.getElementById('output-content');
    const userAvatar = document.getElementById('user-avatar');
    const usernameInput = document.getElementById('username');
    const raffleOptions = document.getElementById('raffle-options');
    const color1Input = document.getElementById('color1');
    const color2Input = document.getElementById('color2');
    const ticketValueInput = document.getElementById('ticket-value');

    // New inputs for additional tickets
    const additionalTicketsContainer = document.getElementById('additional-tickets-container');
    const addMoreTicketsButton = document.getElementById('add-more-tickets');
    let additionalTicketIndex = 0; // To keep track of the index for new inputs

    // Variable to store the spreadsheet output for Raffle Tickets
    let raffleSpreadsheetOutput = '';
    // Variable to store the BBCode output for Raffle Tickets
    let raffleBBCodeOutput = '';

    // New inputs for Spender Circles
    const spenderCirclesOptions = document.getElementById('spender-circles-options');
    const spenderCircleTicketValueInput = document.getElementById('spender-circle-ticket-value');
    const spenderColor1Input = document.getElementById('spender-color1');
    const spenderColor2Input = document.getElementById('spender-color2');
    const spenderAdditionalTicketsContainer = document.getElementById('spender-additional-tickets-container');
    const addMoreSpenderTicketsButton = document.getElementById('add-more-spender-tickets');
    let spenderAdditionalTicketIndex = 0; // To keep track of the index for new inputs for spender circles

    // Variable to store the spreadsheet output for Spender Circles
    let spenderSpreadsheetOutput = '';
    // Variable to store the BBCode output for Spender Circles
    let spenderBBCodeOutput = '';

    // Spreadsheet Copy Buttons
    const copyRaffleSpreadsheetButton = document.getElementById('copy-raffle-spreadsheet');
    const copySpenderSpreadsheetButton = document.getElementById('copy-spender-spreadsheet');

    // Additional Input Textareas
    const raffleAdditionalInputTextarea = document.getElementById('raffle-additional-input');
    const spenderAdditionalInputTextarea = document.getElementById('spender-additional-input');

    // Flag Meaning Inputs
    const flagMeanings = {};
    for (let i = 1; i <= 5; i++) {
        flagMeanings[i] = document.getElementById(`flag-meaning-${i}`);
    }

    // Google Sheet Link Input (for user info only)
    const googleSheetLinkInput = document.getElementById('google-sheet-link');

    // New elements for Draw For Winners
    const drawWinnersOptions = document.getElementById('draw-winners-options');
    const ticketListBBCodeInput = document.getElementById('ticket-list-bbcode');
    const prizesListInput = document.getElementById('prizes-list');
    const winningNumbersListInput = document.getElementById('winning-numbers-list');
    const winnersOutputContent = document.getElementById('winners-output-content');
    const copyWinnersOutputButton = document.getElementById('copy-winners-output');

    // Variable to store the generated winners list array for copying
    let lastWinnersList = null;

    // Set fixed username and avatar
    usernameInput.value = 'daisies';
    usernameInput.disabled = true;
    userAvatar.src = 'https://u.cubeupload.com/AnnaG/b0MariaGeramiaAwaiting.png';

    // Create copy button (main copy button for BBCode output)
    const copyButton = document.createElement('button');
    copyButton.textContent = 'Copy Output';
    copyButton.style.marginTop = '10px';
    copyButton.style.padding = '5px 10px';
    copyButton.style.backgroundColor = '#4CAF50';
    copyButton.style.color = 'white';
    copyButton.style.border = 'none';
    copyButton.style.borderRadius = '4px';
    copyButton.style.cursor = 'pointer';
    copyButton.addEventListener('click', () => {
        let contentToCopy = '';
        const selectedOption = optionSelect.value;

        if (selectedOption === 'raffle' && raffleBBCodeOutput) {
            contentToCopy = raffleBBCodeOutput;
        } else if (selectedOption === 'spender-circles' && spenderBBCodeOutput) {
            contentToCopy = spenderBBCodeOutput;
        } else if (selectedOption === 'draw-winners' && winnersOutputContent.textContent) { // Added for Draw For Winners
            contentToCopy = winnersOutputContent.textContent; // Copy the generated winners list
        } else {
            console.warn('No output to copy for the selected option.');
            copyButton.textContent = 'No Output!';
            setTimeout(() => {
                copyButton.textContent = 'Copy Output';
            }, 2000);
            return; // Exit if no content
        }

        copyToClipboard(contentToCopy)
           .then(() => {
               copyButton.textContent = 'Copied!';
           })
           .catch(err => {
               console.error('Failed to copy output:', err);
               copyButton.textContent = 'Copy Failed!';
           })
           .finally(() => {
               setTimeout(() => {
                   copyButton.textContent = 'Copy Output';
               }, 2000);
           });
    });
    // Append the main copy button below the output content area
    outputContent.parentNode.appendChild(copyButton);

    // Add event listener for Raffle spreadsheet copy button
    if (copyRaffleSpreadsheetButton) {
        copyRaffleSpreadsheetButton.addEventListener('click', () => {
            if (raffleSpreadsheetOutput) {
               copyToClipboard(raffleSpreadsheetOutput)
                  .then(() => {
                       copyRaffleSpreadsheetButton.textContent = 'Copied!';
                   })
                   .catch(err => {
                       console.error('Failed to copy raffle spreadsheet data:', err);
                       copyRaffleSpreadsheetButton.textContent = 'Copy Failed!';
                   })
                   .finally(() => {
                       setTimeout(() => {
                           copyRaffleSpreadsheetButton.textContent = 'Copy for Spreadsheet';
                       }, 2000);
                   });
            } else {
                console.warn('No spreadsheet data to copy for Raffle Tickets.');
                 // Optional: Provide visual feedback if there's no data
                copyRaffleSpreadsheetButton.textContent = 'No Data!';
                setTimeout(() => {
                    copyRaffleSpreadsheetButton.textContent = 'Copy for Spreadsheet';
                }, 2000);
            }
        });
    }

    // Add event listener for Spender Circles spreadsheet copy button
    if (copySpenderSpreadsheetButton) {
        copySpenderSpreadsheetButton.addEventListener('click', () => {
            if (spenderSpreadsheetOutput) {
               copyToClipboard(spenderSpreadsheetOutput)
                  .then(() => {
                       copySpenderSpreadsheetButton.textContent = 'Copied!';
                   })
                   .catch(err => {
                       console.error('Failed to copy spender spreadsheet data:', err);
                       copySpenderSpreadsheetButton.textContent = 'Copy Failed!';
                   })
                   .finally(() => {
                       setTimeout(() => {
                           copySpenderSpreadsheetButton.textContent = 'Copy for Spreadsheet';
                       }, 2000);
                   });
            } else {
                console.warn('No spreadsheet data to copy for Spender Circles.');
                 // Optional: Provide visual feedback if there's no data
                copySpenderSpreadsheetButton.textContent = 'No Data!';
                setTimeout(() => {
                    copySpenderSpreadsheetButton.textContent = 'Copy for Spreadsheet';
                }, 2000);
            }
        });
    }

    // Add event listener for the new Draw For Winners copy button
    if (copyWinnersOutputButton) {
        copyWinnersOutputButton.addEventListener('click', () => {
            // Check if there's a generated winners list to copy
            if (lastWinnersList && lastWinnersList.length > 0) {
               copyToClipboard(lastWinnersList.join('\n')) // Join with newline characters for copying
                  .then(() => {
                       copyWinnersOutputButton.textContent = 'Copied!';
                   })
                   .catch(err => {
                       console.error('Failed to copy winners list output:', err);
                       copyWinnersOutputButton.textContent = 'Copy Failed!';
                   })
                   .finally(() => {
                       setTimeout(() => {
                           copyWinnersOutputButton.textContent = 'Copy Winners List';
                       }, 2000);
                   });
            } else {
                console.warn('No winners list output to copy.');
                 // Optional: Provide visual feedback if there's no data
                copyWinnersOutputButton.textContent = 'No Data!';
                setTimeout(() => {
                    copyWinnersOutputButton.textContent = 'Copy Winners List';
                }, 2000);
            }
        });
    }

    // Show/hide options based on selection
    optionSelect.addEventListener('change', () => {
        processInput(); // Call processInput on change to manage display and processing
    });

    // Process input based on selected option and manage display
    // Event listeners for specific inputs are still needed to re-run processInput when inputs change for the currently selected option
    inputContent.addEventListener('input', processInput);
    color1Input.addEventListener('change', processInput);
    color2Input.addEventListener('change', processInput);
    ticketValueInput.addEventListener('change', processInput);

    // Add event listeners for new textareas and flag inputs
    if (raffleAdditionalInputTextarea) {
        raffleAdditionalInputTextarea.addEventListener('input', processInput);
    }
    if (spenderAdditionalInputTextarea) {
        spenderAdditionalInputTextarea.addEventListener('input', processInput);
    }
    if (googleSheetLinkInput) {
        googleSheetLinkInput.addEventListener('input', processInput);
    }
    for (let i = 1; i <= 5; i++) {
        if (flagMeanings[i]) {
            flagMeanings[i].addEventListener('input', processInput);
        }
    }

    // Add event listeners for Draw For Winners inputs
    if (ticketListBBCodeInput) {
        ticketListBBCodeInput.addEventListener('input', processInput);
    }
    if (prizesListInput) {
        prizesListInput.addEventListener('input', processInput);
    }
    if (winningNumbersListInput) {
        winningNumbersListInput.addEventListener('input', processInput);
    }

    // Main processing and display management function
    function processInput() {
        const selectedOption = optionSelect.value;

        // Get references to the main input and output boxes' parent container
        const contentBoxes = document.querySelector('.content-boxes');

        // Hide all option-specific divs initially
        raffleOptions.style.display = 'none';
        spenderCirclesOptions.style.display = 'none';
        drawWinnersOptions.style.display = 'none';

        // Hide/show main content boxes and specific option divs, and trigger processing
        switch (selectedOption) {
            case 'raffle':
                contentBoxes.style.display = 'grid'; // Show main input/output section
                raffleOptions.style.display = 'block'; // Show raffle specific options inside main input

                // Process raffle tickets and display output in the main output box
                outputContent.innerHTML = processRaffleTickets(inputContent.value);
                outputContent.style.color = '#000';
                // Clear winners output as it's not used for this option
                winnersOutputContent.innerHTML = '';
                break;
            case 'spender-circles':
                contentBoxes.style.display = 'grid'; // Show main input/output section
                spenderCirclesOptions.style.display = 'block'; // Show spender circles specific options inside main input

                 // Process spender circles and display output in the main output box
                outputContent.innerHTML = processSpenderCircles(inputContent.value);
                outputContent.style.color = '#000';
                // Clear winners output as it's not used for this option
                winnersOutputContent.innerHTML = '';
                break;
            case 'draw-winners':
                contentBoxes.style.display = 'none'; // Hide main input/output section
                drawWinnersOptions.style.display = 'block'; // Show draw winners section

                // Process draw winners and display output in the dedicated winners output box
                lastWinnersList = processDrawWinners(); // Store the returned winners list array
                // Clear main output as it's not used for this option
                outputContent.innerHTML = '';
                outputContent.style.color = '';
                break;
            default:
                // If no option is selected, show the main input/output section and prompt the user
                contentBoxes.style.display = 'grid';
                outputContent.innerHTML = 'Please select an option.';
                 outputContent.style.color = '';
                 winnersOutputContent.innerHTML = ''; // Ensure winners output is clear
                break;
        }
    }

    function processRaffleTickets(input) {
        const lines = input.split('\n').filter(line => line.trim());
        if (lines.length > 500) {
            return "Error: Maximum 500 lines allowed";
        }

        const color1 = color1Input.value;
        const color2 = color2Input.value;
        const ticketValue = parseInt(ticketValueInput.value);

        // Reverse the input lines first to process in chronological order
        const reversedLines = [...lines].reverse();

        // Combine store history and additional entries into a single list
        const allRaffleEntries = [];

        // Process lines from store history input
        for (const line of reversedLines) {
            const parts = line.split('\t');
            if (parts.length < 4) continue;
            const username = parts[2].trim();
            const value = parseInt(parts[3].split(' ')[0].replace(/,/g, ''));
            const timestamp = parts[4] ? parts[4].trim() : 'NA';
            const numTickets = !isNaN(value) ? Math.floor(value / ticketValue) : 0;

            if (username && numTickets > 0) {
                 allRaffleEntries.push({
                    user: username,
                    value: isNaN(value) ? 0 : value, // Store the original value
                    ticketAmount: numTickets, // Tickets from this transaction
                    timestamp: timestamp,
                    flag: 0, // Flag 0 for store history
                    source: 'store' // Mark as store history entry
                });
            }
        }

        // Process additional raffle tickets input and add to the combined list
        const additionalEntries = parseAdditionalInput(raffleAdditionalInputTextarea.value);
        additionalEntries.forEach(entry => {
             if (entry.user && entry.ticketAmount > 0) {
                 allRaffleEntries.push({
                    user: entry.user,
                    value: entry.value !== undefined ? entry.value : '', // Store the provided value
                    ticketAmount: entry.ticketAmount,
                    timestamp: entry.timestamp !== undefined ? entry.timestamp : '',
                    flag: entry.flag !== undefined ? entry.flag : '', // Store the provided flag
                    source: 'additional' // Mark as additional entry
                });
             }
        });

        // Sort the combined list for spreadsheet output and display range generation
        // Sort order: store history (by timestamp ascending) first, then additional entries (by timestamp ascending, putting empty timestamps last)
        allRaffleEntries.sort((a, b) => {
            // Primary sort by source (store before additional)
            if (a.source === 'store' && b.source !== 'store') return -1;
            if (a.source !== 'store' && b.source === 'store') return 1;

            // Secondary sort by timestamp within the same source
            // For store entries, sort by timestamp ascending
            if (a.source === 'store' && b.source === 'store') {
                 // Handle 'NA' or empty timestamps by putting them at the end of the store entries
                 if (a.timestamp === 'NA' || a.timestamp === '') return 1;
                 if (b.timestamp === 'NA' || b.timestamp === '') return -1;
                 return String(a.timestamp).localeCompare(String(b.timestamp));
            }

            // For additional entries, sort by timestamp ascending, putting empty timestamps last
            if (a.timestamp === '' && b.timestamp !== '') return 1;
            if (a.timestamp !== '' && b.timestamp === '') return -1;
            if (a.timestamp === '' && b.timestamp === '') return 0; // Maintain relative order if both empty
            return String(a.timestamp).localeCompare(String(b.timestamp));
        });

        // Calculate ticket ranges and prepare data for display and spreadsheet
        const ticketsForDisplay = [];
        const spreadsheetData = [];
        let currentTicketNumber = 1;

        let currentUser = null;
        let currentStartTicketForRange = 1;

        allRaffleEntries.forEach(entry => {
            if (entry.ticketAmount > 0) {
                // Store data for spreadsheet
                const resolvedFlag = getResolvedFlagMeaning(entry.flag);
                spreadsheetData.push({
                    user: entry.user,
                    ticketAmount: entry.ticketAmount,
                    value: entry.value,
                    timestamp: entry.timestamp,
                    flagMeaning: resolvedFlag
                });

                // Prepare data for display ranges - this logic still groups consecutive tickets for the same user
                // even if they come from different sources after sorting for the spreadsheet.
                // If you need display ranges to strictly follow the sorted spreadsheet order, this logic would need adjustment.
                // Based on previous requirement, display is sorted by start ticket number which is generated sequentially.

                // Update display ranges based on sequential ticket numbering through the sorted entries
                 if (currentUser === null || currentUser !== entry.user) {
                     // Start a new range for a new user or the first entry
                     if (currentUser !== null) {
                          // Close the previous range if it exists
                          ticketsForDisplay.push({ user: currentUser, start: currentStartTicketForRange, end: currentTicketNumber - 1 });
                     }
                     currentUser = entry.user;
                     currentStartTicketForRange = currentTicketNumber;
                 } else if (currentUser === entry.user) {
                      // Continue the current range for the same user
                 }

                currentTicketNumber += entry.ticketAmount;
            }
        });

        // Push the last range after the loop
        if (currentUser !== null) {
             ticketsForDisplay.push({ user: currentUser, start: currentStartTicketForRange, end: currentTicketNumber - 1 });
        }

         // Sort display tickets by start number for correct order
         ticketsForDisplay.sort((a, b) => a.start - b.start);

        // Generate the spreadsheet output string from the sorted combined data
        const spreadsheetHeader = "Username\tTickets from Transaction\tValue\tTimestamp\tFlag Meaning";
        const spreadsheetRows = spreadsheetData.map(data => {
            return `${data.user}\t${data.ticketAmount}\t${data.value}\t${data.timestamp}\t${data.flagMeaning}`;
        }).join('\n');

        // Assign the spreadsheet output to the variable for the spreadsheet copy button
        raffleSpreadsheetOutput = spreadsheetHeader + '\n' + spreadsheetRows;

        // Generate the regular display output with HTML color spans from ranges
        const displayOutput = ticketsForDisplay.map(ticket => {
            const range = ticket.start === ticket.end ?
                `${ticket.start}` :
                `${ticket.start}-${ticket.end}`;
            // Remove BBCode tags for display output
            return `${range} :: ${ticket.user}`;
        }).join('<br>') + '<br>';

        // Generate BBCode output for the copy button
        const bbcodeOutput = ticketsForDisplay.map(ticket => {
            const range = ticket.start === ticket.end ?
                `[color=${color1}]${ticket.start}[/color]` :
                `[color=${color1}]${ticket.start}-${ticket.end}[/color]`;
            return `${range} [color=${color2}]::[/color] [color=${color1}]${ticket.user}[/color]`;
        }).join('\n') + '\n'; // Use newline for BBCode copy

        // Assign the BBCode output to the new variable for the general copy button
        raffleBBCodeOutput = bbcodeOutput;

        // Debugging: Log the display output content
        console.log('Raffle Display Output:', displayOutput);

        // Debugging: Log the BBCode output content
        console.log('Raffle BBCode Output:', bbcodeOutput);

        return displayOutput;
    }

    function processSpenderCircles(input) {
        const lines = input.split('\n').filter(line => line.trim());
        if (lines.length > 500) {
            return "Error: Maximum 500 lines allowed";
        }

        const spenderCircleTicketValue = parseInt(spenderCircleTicketValueInput.value) || 1; // Default to 1 to avoid division by zero

        // Aggregate spending per user (case-insensitive username)
        const userSpendings = {};
        const userOriginalNames = {}; // To store the original case username

        // Combine store history and additional entries to find original usernames
         const allSpenderEntries = [];

        for (const line of lines) {
            const parts = line.split('\t');
            if (parts.length < 4) continue;
            const username = parts[2].trim();
            const lowerUsername = username.toLowerCase();
            const value = parseInt(parts[3].split(' ')[0].replace(/,/g, ''));

            if (!isNaN(value)) {
                userSpendings[lowerUsername] = (userSpendings[lowerUsername] || 0) + value;
                if (!userOriginalNames[lowerUsername]) {
                     userOriginalNames[lowerUsername] = username; // Store original case
                 }
            }
             // Collect all entries to potentially find original username later
            allSpenderEntries.push({ user: username, value: value, timestamp: parts[4] ? parts[4].trim() : 'NA', flag: 0 });
        }

        const additionalEntries = parseAdditionalInput(spenderAdditionalInputTextarea.value);
        additionalEntries.forEach(entry => {
            const lowerUsername = entry.user.trim().toLowerCase();
            const additionalValue = entry.value || 0;

            if (entry.user && additionalValue > 0) {
                userSpendings[lowerUsername] = (userSpendings[lowerUsername] || 0) + additionalValue;
                 if (!userOriginalNames[lowerUsername]) {
                     userOriginalNames[lowerUsername] = entry.user; // Store original case
                 }
            }
             // Collect all entries to potentially find original username later
            allSpenderEntries.push({ user: entry.user, value: additionalValue, timestamp: entry.timestamp, flag: entry.flag });
        });

        // Prepare spreadsheet data (one row per user)
        const spreadsheetData = [];
        const ticketsForDisplay = []; // Data for the display output (ranges)
        let currentTicketNumber = 1;

        // Process users in alphabetical order for consistent spreadsheet and display output order
        const sortedUsernames = Object.keys(userSpendings).sort();

        for (const lowerUsername of sortedUsernames) {
            const totalSpending = userSpendings[lowerUsername];
            const numTickets = Math.floor(totalSpending / spenderCircleTicketValue);

            if (numTickets > 0) {
                // Use the stored original case username
                const originalUsername = userOriginalNames[lowerUsername] || lowerUsername;

                // Add data for spreadsheet output (one row per user)
                spreadsheetData.push({
                    user: originalUsername,
                    totalSpending: totalSpending,
                    calculatedTickets: numTickets
                });

                // Prepare data for display ranges
                const startTicket = currentTicketNumber;
                const endTicket = currentTicketNumber + numTickets - 1;
                ticketsForDisplay.push({ user: originalUsername, start: startTicket, end: endTicket });
                currentTicketNumber += numTickets;
            }
        }

         // Sort display tickets by start number for correct order (already sorted by username and processed sequentially, but explicit sort is safer)
         ticketsForDisplay.sort((a, b) => a.start - b.start);

        // Generate the spreadsheet output string from aggregated user data
        const spreadsheetHeader = "Username\tTotal Spent\tCalculated Spender Circle Tickets";
        const spreadsheetRows = spreadsheetData.map(data => {
            return `${data.user}\t${data.totalSpending}\t${data.calculatedTickets}`;
        }).join('\n');

        // Assign the spreadsheet output to the variable for the spreadsheet copy button
        spenderSpreadsheetOutput = spreadsheetHeader + '\n' + spreadsheetRows;

        // Generate the regular display output with HTML color spans from ranges
        const color1 = spenderColor1Input.value;
        const color2 = spenderColor2Input.value;

        const displayOutput = ticketsForDisplay.map(ticket => {
            const range = ticket.start === ticket.end ?
                `${ticket.start}` :
                `${ticket.start}-${ticket.end}`;
            // Remove BBCode tags for display output
            return `${range} :: ${ticket.user}`;
        }).join('<br>') + '<br>';

        // Generate BBCode output for the copy button
        const bbcodeOutput = ticketsForDisplay.map(ticket => {
            const range = ticket.start === ticket.end ?
                `[color=${color1}]${ticket.start}[/color]` :
                `[color=${color1}]${ticket.start}-${ticket.end}[/color]`;
            return `${range} [color=${color2}]::[/color] [color=${color1}]${ticket.user}[/color]`;
        }).join('\n') + '\n'; // Use newline for BBCode copy

        // Assign the BBCode output to the new variable for the general copy button
        spenderBBCodeOutput = bbcodeOutput;

        // Debugging: Log the display output content
        console.log('Spender Circles Display Output:', displayOutput);

        // Debugging: Log the BBCode output content
        console.log('Spender Circles BBCode Output:', bbcodeOutput);

        return displayOutput;
    }

    // New function to process Draw For Winners inputs and generate output
    function processDrawWinners() {
        const bbcodeInput = ticketListBBCodeInput.value;
        const prizesInput = prizesListInput.value;
        const winningNumbersInput = winningNumbersListInput.value;

        // Clear previous output and errors
        winnersOutputContent.innerHTML = '';
        winnersOutputContent.style.color = '';

        if (!bbcodeInput || !prizesInput || !winningNumbersInput) {
            winnersOutputContent.innerHTML = 'Please provide input for all fields.';
            winnersOutputContent.style.color = 'orange';
            return;
        }

        // 1. Parse BBCode ticket list
        const ticketMap = new Map(); // Map ticket number to username
        const bbcodeLines = bbcodeInput.split('\n').filter(line => line.trim());
        const bbcodeRegex = /\[color=.*?\].*?(\d+)(?:-(\d+))?\[\/color\].*?::.*?\>(.*?)\[\/color\]/;
        // New regex for plain text format: startTicket(-endTicket)? :: Username
        const plainTextRegex = /(\d+)(?:-(\d+))?\s*::\s*(.+)/;

        console.log("Starting ticket parsing..."); // Debug log

        for (const line of bbcodeLines) {
            let match = line.match(bbcodeRegex);
            let startTicket, endTicket, username;

            if (match) {
                startTicket = parseInt(match[1]);
                endTicket = match[2] ? parseInt(match[2]) : startTicket;
                username = match[3].trim();
                console.log(`BBCode Match: line='${line}', start=${startTicket}, end=${endTicket}, user='${username}'`); // Debug log
            } else {
                // If not BBCode, try the plain text format
                match = line.match(plainTextRegex);
                if (match) {
                    startTicket = parseInt(match[1]);
                    endTicket = match[2] ? parseInt(match[2]) : startTicket;
                    username = match[3].trim();
                    console.log(`Plain Text Match: line='${line}', start=${startTicket}, end=${endTicket}, user='${username}'`); // Debug log
                }
            }

            if (match && !isNaN(startTicket) && !isNaN(endTicket) && username) {
                for (let i = startTicket; i <= endTicket; i++) {
                    ticketMap.set(i, username);
                }
                 console.log(`Added range ${startTicket}-${endTicket} for user ${username}`); // Debug log
            } else if (line.trim() !== '') { // Only warn for non-empty lines that don't match format
                console.warn('Skipping malformed additional input line (incorrect number of parts):', line);
            }
        }
         console.log(`Ticket map populated with ${ticketMap.size} entries.`); // Debug log
         console.log("Ticket Map:", ticketMap); // Debug log

        // 2. Parse prizes list
        const prizes = prizesInput.split('\n').filter(line => line.trim());
        console.log(`Parsed ${prizes.length} prizes.`); // Debug log
        console.log("Prizes:", prizes); // Debug log

        // 3. Parse winning numbers list
        const winningNumbers = winningNumbersInput
            .split(/[,\\s]+/) // Split by comma or space
            .filter(numStr => numStr.trim() !== '')
            .map(numStr => parseInt(numStr.trim()));
        console.log(`Parsed ${winningNumbers.length} winning numbers.`); // Debug log
        console.log("Winning Numbers:", winningNumbers); // Debug log

        // 4. Validate number of winning numbers vs prizes
        if (winningNumbers.length !== prizes.length) {
            winnersOutputContent.innerHTML = `Error: Number of winning numbers (${winningNumbers.length}) does not match the number of prizes (${prizes.length}).`;
            winnersOutputContent.style.color = 'red';
             console.error("Validation failed: Mismatch in prize and winning number counts."); // Debug log
            return;
        }
         console.log("Validation passed: Prize and winning number counts match."); // Debug log

        // 5. Generate winners list
        const winnersList = [];
        console.log("Generating winners list..."); // Debug log
        for (let i = 0; i < prizes.length; i++) {
            const prize = prizes[i];
            const winningNumber = winningNumbers[i];
            const winnerUsername = ticketMap.get(winningNumber) || 'Unknown User'; // Get username for the winning ticket number
            winnersList.push(`${prize} - ${winningNumber} - ${winnerUsername}`);
            console.log(`Prize ${i+1}: Winning Number=${winningNumber}, Winner=${winnerUsername}`); // Debug log
        }
        console.log("Winners List:", winnersList); // Debug log

        // 6. Display output
        winnersOutputContent.innerHTML = winnersList.join('<br>');
        winnersOutputContent.style.color = '#000'; // Set color for winners output
         console.log("Output displayed."); // Debug log

        // Return the generated winners list array
        return winnersList;
    }

    // Save user information
    function saveUserInfo() {
        const userInfo = {
            username: usernameInput.value,
            avatar: userAvatar.src
        };
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
    }

    // Load saved user information
    function loadUserInfo() {
        const savedInfo = localStorage.getItem('userInfo');
        if (savedInfo) {
            const userInfo = JSON.parse(savedInfo);
            usernameInput.value = userInfo.username;
            userAvatar.src = userInfo.avatar;
        }
    }

    // Save user info when changed
    usernameInput.addEventListener('change', saveUserInfo);
    userAvatar.addEventListener('load', saveUserInfo);

    // Load saved info on page load
    loadUserInfo();

    // Process input initially to set correct display state on page load
    processInput();

    // Helper function to parse additional input lines
    function parseAdditionalInput(input) {
        const entries = [];
        const lines = input.split('\n').filter(line => line.trim());
        for (const line of lines) {
            // Use a more robust split that handles spaces around the delimiter
            const parts = line.split('/').map(part => part.trim());
            if (parts.length >= 3) { // Minimum required: Username / Value or Ticket Amount / Timestamp or Flag
                const username = parts[0];
                // Ensure parsing of numbers is handled correctly, defaulting to 0 if invalid
                const value = parts[1] ? parseInt(parts[1]) : 0; // Value or Additionally Spent Value
                const ticketAmount = parts[2] ? parseInt(parts[2]) : 0; // Ticket Amount for Raffle
                const timestamp = parts[3] ? parts[3] : ''; // Set to empty string if empty
                const flag = parts[4] ? parts[4] : ''; // Set to empty string if empty
    
                if (username) {
                    entries.push({
                        user: username,
                        value: isNaN(value) ? 0 : value, // Default to 0 if parsing failed
                        ticketAmount: isNaN(ticketAmount) ? 0 : ticketAmount, // Default to 0 if parsing failed
                        timestamp: timestamp,
                        flag: flag
                    });
                } else {
                    console.warn('Skipping additional input line with empty username:', line);
                }
            } else if (line.trim() !== '') { // Only warn for non-empty lines that don't match format
                console.warn('Skipping malformed additional input line (incorrect number of parts):', line);
            }
        }
        return entries;
    }

    // Helper function to get resolved flag meaning
    function getResolvedFlagMeaning(flag) {
        if (flag === 0 || flag === '0') return "Store-Bought"; // Handle both number and string 0
        const flagNum = parseInt(flag);
        if (flagNum >= 1 && flagNum <= 5 && flagMeanings[flagNum] && flagMeanings[flagNum].value) {
            return flagMeanings[flagNum].value;
        } else if (flag === '') {
            return ''; // Return empty string if flag is empty
        }
        return flag; // Return original flag if no meaning defined or invalid number
    }
    
    // Helper function to copy text to clipboard
    function copyToClipboard(text) {
        console.log("Attempting to copy to clipboard:", text);
        // Use the modern Clipboard API
        if (navigator.clipboard && navigator.clipboard.writeText) {
            return navigator.clipboard.writeText(text);
        } else {
            // Fallback for older browsers or environments where Clipboard API is not available
            console.warn('Clipboard API not available, falling back to execCommand.');
            const tempTextArea = document.createElement('textarea');
            tempTextArea.value = text;
            // Avoid scrolling to the textarea by making it off-screen
            tempTextArea.style.position = 'fixed';
            tempTextArea.style.left = '-9999px';
            tempTextArea.style.top = '0';
            document.body.appendChild(tempTextArea);
            tempTextArea.focus();
            tempTextArea.select();
            try {
                const successful = document.execCommand('copy');
                console.log('Fallback copy command was ', successful ? 'successful' : 'unsuccessful');
                document.body.removeChild(tempTextArea);
                // Return a resolved or rejected promise based on success
                return successful ? Promise.resolve() : Promise.reject(new Error('Fallback copy failed'));
            } catch (err) {
                console.error('Fallback copy failed:', err);
                document.body.removeChild(tempTextArea);
                return Promise.reject(err);
            }
        }
    }
}); 